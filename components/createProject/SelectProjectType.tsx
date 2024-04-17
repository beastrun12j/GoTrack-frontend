"use client";

import { Button } from "../ui/button";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

import { Dispatch, SetStateAction } from "react";

interface SelectProjectTypeProps {
  setCategory: Dispatch<SetStateAction<string>>;
  setCategories: Dispatch<SetStateAction<string[]>>;
}

export default function SelectProjectType({
  setCategory,
  setCategories,
}: SelectProjectTypeProps) {
  const [categoryName, setCategoryName] = useState("");
  const [isOpen, setisOpen] = useState(false);

  const handleClick = () => {
    setCategory(categoryName);
    setCategories((val) => [...val, categoryName]);
    setisOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setisOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-25 text-xs text-gray-600 bg-gray-300 border border-gray-300 rounded-md mx-1"
            type="button"
            onClick={() => {
              setisOpen(true);
            }}
          >
            +Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Custom Category</DialogTitle>
            <DialogDescription>
              Add your category. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
                onChange={(e) => setCategoryName(e.target.value)}
                value={categoryName}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleClick}
              className="text-white bg-blue-500 border border-sky-500 rounded-md my-1 mt-5 sm:mt-0 mx-4 sm:mx-0 sm:my-0 sm:ml-1 p-2 px-4"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
