"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DialogInput from "@/components/ui/dialog-input";

const CreateModuleButton = () => {
  const [moduleName, setModuleName] = useState<string>("");
  const [moduleDescription, setModuleDescription] = useState<string>("");

  const isValid = moduleName.length !== 0 && moduleDescription.length !== 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button title="Create Module" className="bg-gray-dark-2 px-3">
          +
        </button>
      </DialogTrigger>
      <DialogContent className="bg-beige sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            <h1 className="text-3xl font-bold text-black">
              CREATE A NEW MODULE
            </h1>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-y-8 py-4">
          <DialogInput
            name="Module Name*"
            placeholder="e.g. Overview"
            id="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setModuleName(e.target.value)
            }
            value={moduleName}
          />
          <DialogInput
            name="Module Description*"
            placeholder="e.g. This course explores Digital Literacy and its importance for teachers and students."
            id="description"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setModuleDescription(e.target.value)
            }
            value={moduleDescription}
          />
        </div>
        <DialogFooter className="grid grid-cols-1">
          <Button
            variant="secondary"
            type="submit"
            disabled={!isValid}
            className={`${!isValid ? "cursor-not-allowed opacity-50" : "bg-blue"}`}
          >
            Create Module
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModuleButton;
