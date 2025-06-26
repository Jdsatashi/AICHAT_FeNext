import React, { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiRoutes } from "@/constants/routeApi";

interface User {
  id: number;
  username: string;
  email: string;
}

interface ComboBoxProps {
  setInputValue: (value: string | number) => void;
}

export default function UserComboBox({ setInputValue }: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<User | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${apiRoutes.users}?query=${search}`, {
          signal: controller.signal,
        });
        const json = await res.json();
        setUsers(json.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    if (search.length === 0 || search.length > 1) {
      fetchUsers();
    }

    return () => controller.abort();
  }, [search]);

  const handleSelect = (user: User) => {
    setSelected(user);
    setInputValue(user.id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="btn btn-outline btn-info w-full">
          {selected
            ? `${selected.username} (${selected.email})`
            : "Select a user..."}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search user..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.username}
                  onSelect={() => handleSelect(user)}
                >
                  {user.username} ({user.email})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
