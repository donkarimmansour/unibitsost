interface ProductProps {
  children?: React.ReactNode
}

export default function ProductLayout({ children }: ProductProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8 sm:w-[500px]">
          {children}
    </div>
  )
}
