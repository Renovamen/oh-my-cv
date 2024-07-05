import { type VariantProps, cva } from "class-variance-authority";

export { default as Alert } from "./Alert.vue";
export { default as AlertTitle } from "./AlertTitle.vue";
export { default as AlertDescription } from "./AlertDescription.vue";

export const alertVariants = cva(
  "relative w-full rounded-md border p-3 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-accent/30 text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "border-success/60 bg-success/5 [&>svg]:text-success [&>h5]:text-success",
        info: "border-info/60 bg-info/5 [&>svg]:text-info [&>h5]:text-info"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export type AlertVariants = VariantProps<typeof alertVariants>;
