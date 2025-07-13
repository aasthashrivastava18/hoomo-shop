import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import BannerSlider from "./components/common/BannerSlider";
import CategoryCards from "./components/common/CategoryCards";
import Footer from "./components/common/Footer";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import GroceryHomePage from "./pages/GroceryHomePage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import ClothesHomePage from "./pages/ClothesHomePage";
import ClothesDetailPage from "./pages/ClothesDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import GroceryProductDetailPage from "./pages/GroceryProductDetailPage";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminProductsPage from "./pages/AdminProductsPage.jsx";
import AdminUsersPage from "./pages/AdminUsersPage.jsx";
import AdminClothesPage from "./pages/AdminClothesPage.jsx";
import AdminRestaurantsPage from "./pages/AdminRestaurantsPage.jsx";
import DealOfTheDay from "./components/common/DealOfTheDay.jsx";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full p-0 m-0 animate-fadeIn">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <BannerSlider />
                <DealOfTheDay />
                <CategoryCards />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/grocery" element={<GroceryHomePage />} />
          <Route path="/grocery/category/:categoryName" element={<CategoryProductsPage />} />
          <Route path="/grocery/product/:id" element={<GroceryProductDetailPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
          <Route path="/clothes" element={<ClothesHomePage />} />
          <Route path="/clothes/:id" element={<ClothesDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/clothes" element={<AdminClothesPage />} />
          <Route path="/admin/restaurants" element={<AdminRestaurantsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
