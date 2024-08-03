"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axiosInstance from "@/lib/axios-instance";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
const formSchema = z.object({
  memberId: z.string().optional(),
});
const SelectForm = () => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance({ url: "/user/all-exept-me" });
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberId: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await axiosInstance({
        url: `/team-members/add-existing-member/${data.memberId}`,
        method: "POST",
      });
      console.log("🚀 ~ onSubmit ~ result:", result);
    } catch (error) {
      console.error("Unexpected error:", error.response.data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="memberId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member</FormLabel>
              <Select
                onValueChange={(value) => { field.onChange(value)}}
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue>
                    {members.find(member => member.id === field.value)?.email || "Select email"}

                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SelectForm;
