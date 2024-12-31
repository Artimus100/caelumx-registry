"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters").max(100),
  projectType: z.string().min(1, "Please select a project type"),
  region: z.string().min(1, "Region is required"),
  vintageYear: z.string().regex(/^\d{4}$/, "Must be a valid year"),
  certificationBody: z.string().min(1, "Certification body is required"),
  creditAmount: z.string().regex(/^\d+$/, "Must be a valid number"),
});

export default function SubmitPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectType: "",
      region: "",
      vintageYear: new Date().getFullYear().toString(),
      certificationBody: "",
      creditAmount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/submit-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit project. Please try again.");
      }

      toast({
        title: "Project submitted successfully",
        description: "Your project is now pending verification.",
      });

      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error submitting project",
        description: (error instanceof Error ? error.message : "Please try again later."),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Submit Carbon Credit Project</h1>
          <p className="text-gray-600 mt-2">
            Fill in the details of your carbon credit project for verification.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="reforestation">Reforestation</SelectItem>
                      <SelectItem value="renewable">Renewable Energy</SelectItem>
                      <SelectItem value="methane">Methane Capture</SelectItem>
                      <SelectItem value="energy">Energy Efficiency</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project region" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vintageYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vintage Year</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certificationBody"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification Body</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter certification body" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="creditAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Amount (tCO2e)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit Project
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
