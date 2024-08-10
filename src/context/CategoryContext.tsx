import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where, writeBatch } from 'firebase/firestore';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../configs/Firebase';

interface Category {
  name: string;
  id: string;
  userId: string;
  createdAt: Date;
  emoji: string;
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
  emoji: string;
  setEmoji: React.Dispatch<React.SetStateAction<string>>;
  selectedCategoryEmoji: string;
  setSelectedCategoryEmoji: React.Dispatch<React.SetStateAction<string>>;
  hanldeSelectedCategoryEmoji: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState<string>("🔥");
  const [selectedCategoryEmoji, setSelectedCategoryEmoji] = useState<string>("");
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
    if (categories.length === 9) {
      setError({ message: "Category limit reached", error: true });
      setTimeout(() => setError({ message: "", error: false }), 3000);
      return false;
    }
    return true;
  };

  const hanldeSelectedCategoryEmoji = (category: string) => {
    setSelectedCategoryEmoji(category);
    console.log(category); // This should log the category parameter
  };

  const handleAddCategory = async () => {
    if (!formValidation()) return;

    try {
      const newCategory = {
        name: category,
        userId: userId || "",
        id: uuidv4(),
        createdAt: new Date(),
        emoji: emoji
      };

      await addDoc(collection(db, "categories"), newCategory);

      setCategory("");
      setIsOpen(false);
    } catch (error: any) {
      setError({ message: error.message, error: true });
    }
  };

  const handleGetCategories = () => {
    if (!userId) return;

    const categoriesQuery = query(collection(db, "categories"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(categoriesQuery, (querySnapshot) => {
      const categoriesData: Category[] = [];

      querySnapshot.forEach((doc) => {
        const category = doc.data() as Category;
        category.id = doc.id;
        categoriesData.push(category);
      });

      setCategories(categoriesData);

    });

    // Return the unsubscribe function to stop listening when the component unmounts
    return () => unsubscribe();
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      // Delete all tasks associated with this category
      const todosQuery = query(collection(db, "todos"), where("categoryId", "==", id));
      const querySnapshot = await getDocs(todosQuery);

      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Commit the batch delete
      await batch.commit();

      // Now delete the category
      const categoryRef = doc(db, "categories", id);
      await deleteDoc(categoryRef);

      setCategories(categories.filter(cat => cat.id !== id));
    } catch (error: any) {
      toast.error("Failed to delete category and associated tasks");
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, [userId]);

  return (
    <CategoryContext.Provider
      value={{ categories, category, setCategory, error, handleAddCategory, handleDeleteCategory, setIsOpen, isOpen, setEmoji, emoji, selectedCategoryEmoji, setSelectedCategoryEmoji, hanldeSelectedCategoryEmoji,  }}
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
