import { Checkbox } from "@/components/ui/checkbox";

const CheckboxList = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-1 text-blue-400">
      <Checkbox
        id="terms"
        className=" rounded-full 
         data-[state=checked]:bg-blue-400 data-[state=checked]:text-primary-foreground
        border-blue-400 border-2"
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxList;
