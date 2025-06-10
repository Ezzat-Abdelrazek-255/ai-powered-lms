import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DialogInputProps {
  name: string;
  placeholder: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  notes?: string;
  className?: string;
}

const DialogInput: React.FC<DialogInputProps> = ({
  name,
  placeholder,
  id,
  onChange,
  value,
  notes = "",
  className = "",
}) => {
  return (
    <div className={`grid items-center gap-y-1 ${className}`}>
      <Label htmlFor={id} className="text-xl font-semibold text-gray-light">
        <p>{name}</p>
        {notes !== "" && <p className="text-lg font-thin">{notes}</p>}
      </Label>
      <Input
        id={id}
        placeholder={placeholder}
        variant="beige"
        className="text-2xl text-gray-dark-2 placeholder-gray-light"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default DialogInput;
