import UserContextProvider from "@/context/userContext";
export default function RootLayout({ children }) {
    return (
      <div>
   <UserContextProvider>
   {children}
   </UserContextProvider>
      </div>
    );
  }
  