import { Text } from "@mantine/core";
import Header from "./components/Header/header";
import Footer from "./components/Footer";
// import Menu from "@/app/components/Menu/Menu"
import Search from "@/app/components/Search/Search";
import Roomlist from "@/app/(pages)/rooms/components/RoomList";
export default function HomePage() {
  return (
    <>
      <header>
        <Header />
      </header>
      <Search />

      <Roomlist />
      <Footer />
    </>
  );
}
