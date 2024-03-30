import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Header from "@/components/header"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3301/api/ecom/products/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h2 className="text-xl font-semibold">All Products</h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {(data as any).results?.map((product: any) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="h-40 overflow-hidden mb-5">
                  <Image src={product.image} alt={product.name} width={500} height={500}/>
                </div>
              </CardHeader>
              <CardContent>
              <CardTitle className="font-medium">{product.title}</CardTitle>
                <div className="grid gap-2">
                  <div className="text-sm text-muted-foreground capitalize">
                    {product.category}
                  </div>
                  <div className="text-lg font-semibold">${product.price}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
