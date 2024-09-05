// import FileUploader from "../ui/FileUploader";
import EnviormentFactors from "./EnviormentFactors";
import { Button } from "../ui/button";
import { z } from "zod";
import {
  Form,
  // FormControl,
  FormField,
  // FormItem,
  // FormLabel,
  // FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useState } from "react";

const formSchema = z.object({
  file: z.instanceof(FileList).optional(),
});

function Main() {
  const [markup, setMarkup] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const fileRef = form.register("file");
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    let formData = new FormData();
    // console.log(data.file[0]);
    formData.append("file", data.file[0]);
    // console.log(formData);
    // fetch("http://localhost:3000/predict", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     // if (data.errors) {
    //     //   alert(data.errors);
    //     // } else {
    //     console.log(data);
    //     setMarkup(data);
    //     // }
    //   });
  };
  return (
    <div className="flex flex-col content-center gap-12">
      <h1 className="">Welcome,Please upload your Crop Image here</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col content-center gap-12"
        >
          {" "}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => {
              return (
                <Card className="w-[30rem] m-auto">
                  <CardContent className="p-6 space-y-4">
                    <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
                      <FileIcon />
                      <span className="text-sm font-medium text-gray-500">
                        Drag and drop a image or click to browse
                      </span>
                      <span className="text-xs text-gray-500">Image</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <Label htmlFor="file" className="text-sm font-medium">
                        File
                      </Label>
                      <Input
                        id="file"
                        type="file"
                        placeholder="File"
                        // accept="image/*"
                        {...fileRef}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            }}
          />
          <EnviormentFactors />
          <Button type="submit" size="lg">
            Predict
          </Button>
        </form>
      </Form>
      {markup}
    </div>
  );
}

function FileIcon(props: PropsWithChildren) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

export default Main;
