"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "~/modules/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/modules/common/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/modules/common/components/ui/form";
import { Input } from "~/modules/common/components/ui/input";
import { ENDPOINTS } from "~/modules/common/constants";
import { useModal } from "~/modules/modals/hooks";
import { createServerSchema } from "~/modules/modals/schema/createServer";
import { FileUpload } from "~/modules/setup/components";

export default function CreateServerModal() {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isModalOpen = isOpen && type === "createServer";
  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = async (values: z.infer<typeof createServerSchema>) => {
    try {
      await axios.post(ENDPOINTS.servers, values);
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    }
    console.log(values);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint={"serverImage"}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="tex-xs fontt-bold uppercase text-zinc-500 dark:text-secondary/70">
                        Server Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="focus-visable:ring-0 forcus:visible:rign-ffset-0 border-0 bg-zinc-300/50 text-black"
                          placeholder="Enter a server name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant={"primary"} disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
