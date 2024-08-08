import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../configs/Firebase';

interface Category {
  name: string;
  id: string;
  userId: string;
  createdAt: Date; // Add createdAt field
}

interface CategoryContextType {
  categories: Category[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  error: { message: string; error: boolean };
  handleAddCategory: () => void;
  handleDeleteCategory: (id: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<{ message: string; error: boolean }>({
    message: "",
    error: false,
  });
  const { userId } = useAuth();

  const formValidation = () => {
    if (!category) {
      setError({ message: "Category name is required", error: true });
      setTimeout(() => setError({ message: "", error: false }), 3000);
      return false;
    }
    if (category.length < 3) {
      setError({
        message: "Category name must be at least 3 characters",
        error: true,
      });
      setTimeout(() => setError({ message: "", error: false }), 3000);
      return false;
    }
    if (category.length > 10) {
      setError({
        message: "Category name must be less than 10 characters",
        error: true,
      });
      setTimeout(() => setError({ message: "", error: false }), 3000);
      return false;
    }
    if (category === "All tasks") {
      setError({
        message: `Category name "All tasks" is reserved`,
        error: true,
      });
      setTimeout(() => setError({ message: "", error: false }), 3000);
      return false;
    }
    if (categories.some((cat) => cat.name === category)) {
      setError({ message: "Category name already exists", error: true });
      setTimeout(() => setError({ message: "", error: false }), 3000);
      return false;
    }
    if (categories.length >= 5) {
      setError({ message: "Category limit reached", error: true });
      setTimeout(() => setError({ message: "", error: false }), 3000);
      return false;
    }
    return true;
  };

  const handleAddCategory = async () => {
    if (!formValidation()) return;

    try {
      const newCategory = {
        name: category,
        userId: userId || "",
        id: uuidv4(),
        createdAt: new Date(), // Add timestamp here
      };

      await addDoc(collection(db, "categories"), newCategory);

      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setCategory("");
      setIsOpen(false);
    } catch (error: any) {
      setError({ message: error.message, error: true });
    }
  };

  const handleGetCategories = async () => {
    if (!userId) return;

    const allTasksCategory = {
      name: "All tasks",
      userId: userId || "",
      id: uuidv4(),
      createdAt: new Date(), // Add timestamp here
    };

    const categoriesQuery = query(collection(db, "categories"), where("userId", "==", userId));
    try {
      const querySnapshot = await getDocs(categoriesQuery);
      const categoriesData: Category[] = [];
      let allTasksExists = false;

      querySnapshot.forEach((doc) => {
        const category = doc.data() as Category;
        category.id = doc.id;
        if (category.name === "All tasks") {
          allTasksExists = true;
        } else {
          categoriesData.push(category);
        }
      });

      if (!allTasksExists) {
        await addDoc(collection(db, "categories"), allTasksCategory);
        categoriesData.push(allTasksCategory);
      }

      // Sort categories with "All tasks" at the beginning and other categories by creation time
      const sortedCategories = [allTasksCategory, ...categoriesData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())];

      setCategories(sortedCategories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const categoryToDelete = categories.find(cat => cat.id === id);
    if (categoryToDelete?.name === "All tasks") {
      toast.error("Cannot delete the initial task");
      return;
    }
    try {
      const categoryRef = doc(db, "categories", id);
      await deleteDoc(categoryRef);
      setCategories(categories.filter(cat => cat.id !== id));
      toast.success("Category deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, [userId]);

  return (
    <CategoryContext.Provider
      value={{ categories, category, setCategory, error, handleAddCategory, handleDeleteCategory, setIsOpen, isOpen }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
