"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import api from "@/lib/axios-instance";
import { useGetTeamMembers } from "@/hooks/userTeamMembers";
import { useParams } from "next/navigation";
import Toast from "react-hot-toast";
const formSchema = z.object({
  memberId: z.string().optional(),
});
const SelectMember = () => {
  const param = useParams();

  const { teamMembersData, isLoading, status, error } = useGetTeamMembers();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberId: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await api({
        url: `/project-memebers/add-member/${data.memberId}/project/${parseInt(
          param.id[0]
        )}`,
        method: "POST",
      });
      Toast.success(result.data.message);
    } catch (error: any) {
      Toast.error(error.response.data.message);
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
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue>
                      {(teamMembersData &&
                        teamMembersData.data.find(
                          (member) => member.id == field.value
                        )?.user.email) ||
                        "Select email"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teamMembersData &&
                    teamMembersData.data.map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.user.email}
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

export default SelectMember;
