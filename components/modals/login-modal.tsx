'use client';

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Github, Mail } from "lucide-react";

import useRegisterModal from "@/hooks/use-register-modal";
import useLoginModal from "@/hooks/use-login-modal";
import { useToast } from "@/hooks/use-toast";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      signIn('credentials', {
        ...values,
        redirect: false,
      })
        .then((callback) => {
          setLoading(false);

          if (callback?.ok) {
            toast({
              title: "Logged in",
            })
            router.refresh();
            loginModal.onClose();
          }

          if (callback?.error) {
            toast({
              title: callback.error,
            })
          }
        });
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold">
        Welcome Trainer!
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    disabled={loading}
                    placeholder="Email"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    disabled={loading}
                    placeholder="Password"
                    required
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        variant="outline"
        title="Continue with Google"
        onClick={() => signIn('google')}
      >
        <Mail width={16} height={16} className="mr-1" />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        title="Continue with Github"
        onClick={() => signIn('github')}
      >
        <Github width={16} height={16} className="mr-1" />
        Continue with Github
      </Button>
      <div
        className="
        text-foreground
        text-center 
        font-medium 
        mt-4
      "
      >
        <p>First time?
          <span
            onClick={onToggle}
            className="
              text-foreground
              font-semibold
              ml-1
              cursor-pointer 
              hover:underline
            "
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;