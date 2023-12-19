"use client";
import Navbar from "@/components/admin/layout/Navbar";
import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import NoSSRToaster from "@/components/NoSSRToaster";
import { EtherSignerContext } from "@/context/EtherSignerContext";
import { useState } from "react";
import Footer from "@/components/admin/layout/Footer";
import { EtherProviderContext } from "@/context/EtherProviderContext";
import { ethers } from "ethers";
import ElectionStages from "@/components/admin/layout/ElectionStages";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [signer, setSigner] = useState("");
  const signerObject = { signer, setSigner };

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
