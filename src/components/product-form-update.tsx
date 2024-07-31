"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import "@/styles/editor.css"

import { cn } from "@/lib/utils"
import { productUpdateSchema } from "@/lib/validations/product"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

type FormData = z.infer<typeof productUpdateSchema>

interface ProductFormUpdateProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ProductFormUpdate({ className, ...props }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(productUpdateSchema),
    mode: "onBlur",
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const product = props.product

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const response = await fetch(
      `https://fakestoreapi.com/products/${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          price: data.price,
          description: data.description,
          image: data.image,
          category: data.category,
        }),
      }
    )

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your weather was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()

    return toast({
      description: "Your weather has been saved.",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full gap-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <>
                  <Icons.chevronLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              </Link>
            </div>
            <button
              type="submit"
              className={cn(buttonVariants())}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </button>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="title">title</Label>
            <Input
              id="title"
              placeholder="name@example.com"
              type="text"
              autoCapitalize="none"
              autoComplete="title"
              autoCorrect="off"
              defaultValue={product.title}
              disabled={isLoading}
              {...register("title")}
            />
            {errors?.title && (
              <p className="px-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="price">price</Label>
            <Input
              id="price"
              placeholder="name@example.com"
              type="number"
              defaultValue={product.price}
              disabled={isLoading}
              {...register("price")}
            />
            {errors?.price && (
              <p className="px-1 text-xs text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="category">category</Label>

            <Input
              id="category"
              placeholder="test.."
              type="test"
              defaultValue={product.category}
              disabled={isLoading}
              {...register("category")}
            />

            {/* <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  key={field.value}
                  value={field.value}
                  // {...field}
                >
                  <SelectTrigger disabled={isLoading}>
                    <SelectValue placeholder="category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">men</SelectItem>
                    <SelectItem value="women">women</SelectItem>
                    <SelectItem value="kids">kids</SelectItem>
                  </SelectContent>
                </Select>
              )}
            /> */}

            {errors?.category && (
              <p className="px-1 text-xs text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="image">image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              disabled={isLoading}
              title={product?.image}
              {...register("image")}
            />
            {/* {errors?.image && (
            <p className="px-1 text-xs text-red-600">{errors.image.message}</p>
          )} */}
          </div>

          <div className="grid gap-1 prose prose-stone mx-auto dark:prose-invert">
            <TextareaAutosize
              id="description"
              defaultValue={product.description}
              placeholder="description"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
              {...register("description")}
            />

            <p className="text-sm text-gray-500">
              Use{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
