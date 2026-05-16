import Image from "next/image";
import Link from "next/link";
import Featured from "./components/ui/Featured";
import CategoryList from "./components/ui/CategoryList";
import CardList from "./components/ui/CardList";
import Menu from "./components/ui/Menu";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {

  const params = await searchParams;

  const page = parseInt(params.page || "1");
  
  return (
    <div className="">
      <Featured />
      <CategoryList />
      <div className="flex flex-col md:flex-row lg:flex-row gap-20">
        <CardList page={page}/>
        <Menu />
      </div>
    </div>
  );
}
