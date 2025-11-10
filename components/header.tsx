import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <div className="flex justify-center items-center text-center text-2xl p-5">
      <h2 className="mr-3">Expense Tracker</h2>
      <ModeToggle />
    </div>
  );
}
