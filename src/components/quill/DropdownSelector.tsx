// components/DropdownSelector.tsx
import React from 'react';

interface DropdownSelectorProps {
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ onSelectChange }) => {
  return (
    <select className="select bg-slate-200 max-w-xs" onChange={onSelectChange}>
      <option value="default" selected>Default</option>
      <option value="marketer">Marketer</option>
      <option value="assistant">Assistant</option>
      <option value="programmer">Programmer</option>
      <option value="seo-specialist">SEO Specialist</option>
    </select>
  );
};

export default DropdownSelector;
