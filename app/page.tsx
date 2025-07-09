"use client"

import React from "react"

import type { ReactElement } from "react"

import { useState, useMemo, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import {
  Search,
  MapPin,
  Phone,
  Building,
  IndianRupee,
  ArrowUpDown,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Moon,
  Sun,
  Menu,
  X,
  Home,
  TrendingUp,
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Bot,
  Sparkles,
  Zap,
  Star,
} from "lucide-react"
import { useTheme } from "next-themes"

// Sample WhatsApp data with more variety - Updated with new listings
const sampleWhatsAppData = `[9:24 pm, 8/7/2025] Jinesh Hacker House: OFFICE FOR RENT Opp St.John School, CHARAI THANE (w) - 400601 Carpet Area: 1600 Sq.ft Rent: 1,76,000 Previous Tenant: Metropolis Healthcare Lab Condition: Warmshell Possession: August DATTA 8655793033

[9:24 pm, 8/7/2025] Jinesh Hacker House: CHARAI NEAR GANESH CINEMA THANE 400601 (All PAKEJ DIL) 1 BHK 460 C ₹ 85 lac 1 BHK 522 C ₹ 95 lac 2 BHK 700 C ₹ 1.30 cr Pakej with Parking OFFICE 1st Floor 522 C ₹ 1.05 cr Parking extra charge DATTA 8655793033

[9:25 pm, 8/7/2025] Jinesh Hacker House: Available Converted 2.5 Bhk Flat on Rent At pachpakhadi Thane 400602 Area flat is at 5th floor out of 8 Area in Carpet is 767 Sq Ft Rera Carpet Along with kitchen Trolley pipe Gas And one Car Parking asking Rent 53000 Nego please Call Me on my Cell no 9920244733 9619398561 Shailesh Mainkar

[9:26 pm, 8/7/2025] Jinesh Hacker House: 🔴 3 bhk @ Park Woods. Project - PARK WOODS. Behind D'mart. Gb Rd. Thane west 400604. Available LARGE, LAVISH & LUXURIOUS Fully Furnished 3 bhk in Higher Floor with Beautiful Interior, Wonderful Condition, Awesome View & 2 🚘 🚘 Parkings. Rent - 85 k Deposit - 6 Months.

[9:27 pm, 8/7/2025] Jinesh Hacker House: 🔴 3.5 bhk @ Garden Enclave. Project - GARDEN ENCLAVE. Vasant Vihar. Thane west 400607. Available 3.5 bhk FULLY FURNISHED without TV, Wonderful Condition, Amazing View & Parking. Rent - 1 Lakh. Deposit - 6 Months. Note - Family, Bachelors & Single Girls from any Caste or Religions are most welcome🙏

[9:28 pm, 8/7/2025] Jinesh Hacker House: 🔴 3 bhk @ Makhmali Talao. Location - MAKHMALI TALAO. Thane west 400603. Available Spacious & Semi Furnished 3 bhk with 4 Large Balconies, 4 Washrooms, Beautiful Condition & Parking. Rent - 75000 Contact: 9876543210

[9:29 pm, 8/7/2025] Jinesh Hacker House: COMMERCIAL SPACE AVAILABLE Hiranandani Estate Thane 400607 Ground Floor Shop 800 sq ft ₹ 2.5 Lakh/month Prime Location High Footfall Suitable for Retail/Office Contact: 9988776655

[9:30 pm, 8/7/2025] Jinesh Hacker House: 2 BHK SALE Ghodbunder Road Thane 400615 Carpet: 950 sq ft Price: ₹ 1.45 Cr Ready Possession Amenities: Gym, Pool, Garden Contact: 8877665544

[5:22 pm, 9/7/2025] Jinesh Hacker House: 🍁 IDEAL PROPERTIES 🍁1 BHK TATA SEREIN PRICE:- 1.12 CR HIGHER FLOOR 1 BHK TATA SEREIN PRICE:- 1.10 CR +1 (2 UNIT'S AVAILABLE)HIGHER FLOOR 1 BHK VASANT VIHAR PRICE:- 75 LAC  1 BHK VASANT VIHAR PRICE:- 85 LAC  NEGODONE UP FLAT 1 BHK RAYMOND PRICE:- 1.05 CR🔥 4 MORE INFORMATION📲 KALPESH PATEL 9702449483 9167464737🪧 VASANT VIHAR AMRAPALI ARCADE

[5:22 pm, 9/7/2025] Jinesh Hacker House: ☑️ IDEAL PROPERTIES ☑️💠 AVAILABLE 2 BHK💎 HIRANANDANI MEADOWS 💶 PRICE :- 1.87 CR NEGO🔑 KEY'S WITH US📍 HIGHER FLOOR 4  🦚  INFORMATIONCONTACT 📲 KALPESH PATEL 97024494839167464737

[5:22 pm, 9/7/2025] Jinesh Hacker House: 🧿 IDEAL PROPERTIES 🧿1 BHK HAPPY VALLEY 30K F.F  AVAILABLE FROM AUGUST 1 BHK NEW MAYUR BLDG 22K 1 BHK VASANT VIHAR 28K  2.5 BHK EDEN WOODS 55K FURNISHED 2.5 BHK GAWAND BAUG LOTUS TOWER 60K F.F 4 BHK VASANT VIHAR 65K F.F VEG FAMILY ONLY 3 BHK KALPATARU HILLS 65K3 BHK HIRANANDANI MEADOWS 85K F.F KEY'S WITH US 3 BHK HIRANANDANI MEADOWS 1 LAC F.F CONTACT 📲 KALPESH PATEL 91674647379702449483

[5:22 pm, 9/7/2025] Jinesh Hacker House: 🇺‌🇷‌🇬‌🇪‌🇳‌🇹‌ 🇷‌🇪‌🇳‌🇹‌🇦‌🇱‌‼️AVAILABLE 3BHK , 4BHK & 5BHK FLAT FOR RENT  ‼️🐠1) Crystal Spires Manpada🔑✨ CARPET AREA:-1500SQFT APPROX✨RENT:- 85k & 95k (N)✨SEMI FURNISHED FLAT🐠 2) Rodas Enclave Hiranandani estate 🔑✨CARPET AREA :- 1200+ SQFT✨RENT :- 85k (N)✨ SEMI FURNISHED FLAT🐠 3)Piramal Vaikunth Balkum 🔑✨ CARPET AREA:- 1250+ SQFT✨RENT :- 85k(N)✨SEMI FURNISHED FLAT🐠4) Acme Ozone Manpada🔑✨ CARPET AREA:- 1700+ SQFT✨RENT:- 95K (N)✨SEMI FURNISHED FLAT🔑 KEYS ARE WITH ME ANYTIME VISIT POSSIBLE  🏡SHREE TAKARIYA PROPERTIES            📞9892052519            📞7738449697

[5:22 pm, 9/7/2025] Jinesh Hacker House: Available 1 BHK Flat for Sale👉Jhambli Naka :- 375sqft /75 Lac Negotiable 👉Vartak Nagar :- 360sqft / 65 Lac👉kasarvadvli :- 500sqft / 65 Lac Negotiable👉Vasant Vihar :- 460sqft / 74 Lac 👉Balkum ;- 450Sqft/ 78 Lac/ FF👉Lodha Amara :- 438sqft / 75 Lac 👉Lodha Amara :- 432sqft / 80Lac👉Lodha Amara :- 472sqft / 85Lac👉Charai :- 470sqft / 88Lac/ FF👉Dhokali :- 500sqft / 75 Lac👉Vrindavan Society :- 500sqft / 72 Lac👉Everest Countryside :- 587sqft / 60Lac/FF👉Casa Viva :- 454sqft / 82Lac👉Vartak Nagar :- 500sqft / 71Lac👉Dhokali :- 450sqft / 78Lac (+ 1)👉Raymond :- 390sqft / 1.10 Cr👉Raymond :- 412sqft / 1.10 Cr👉Naupada :- 500sqft / 1Cr Negotiabel👉Waghbil :- 393qft / 70Lac(Attached Garden Space 403sqft)

[5:22 pm, 9/7/2025] Jinesh Hacker House: Requirement  For Prelease Property In Thane West Budget :- 20 CR Return :- 8 to 9 percent Arnav Properties Kiran Gaikwad 98336366999292936599

[5:23 pm, 9/7/2025] Jinesh Hacker House: Available 2 & 2.5 BHK Flat for Sale2 BHK👉One Hiranandani Park :- 540sqft / 1.65 Cr/ FF👉Lodha Amara :- 672sqft / 1.20 Cr👉Lodha Amara :- 585sqft / 95 Lac👉Naupada :- 633sqft / 1.80Cr👉Majiwada:- 704sqft / 1.50Cr👉Lodha Crown :- 470sqft / 1Cr/FF👉Lodha Crown :- 475sqft / 1.02Cr👉Castle mill Circle :- 750sqft / 95 Lac👉Samta Ngar :- 750sqft / 1.30 Cr 👉Charai :- 750sqft / 1.10Cr/ (+ 1)👉Kalpataru Paramount :- 550sqft / 1.20Cr👉The Icon :- 671sqft / 1.25Cr👉Ashar metro :- 630sqft / 1.27Cr 👉Lodha Sterling :- 820sqft / 2 Cr👉Vartak Nagar :- 545sqft / 1.05Cr /FF👉Talav Pali :- 612sqft / 1.35 Cr👉Gautam Sagar Charai :- 840sqft / 2.45Cr/ FF👉Cosmos Jewels :- 687sqft / 1.45 Cr/ FF👉Waghbil :- 640sqft / 1.30 Cr/ SF👉Kopri

[5:23 pm, 9/7/2025] Jinesh Hacker House: Available 3 BHK Flat For Sale👉Crystal Spires :- 1497sqft /3.70Cr👉Kolbad:- 1545sqft /1.50CrFor more details please contact below number 👇Avenue PropertiesBhagyashri 8433950317Vishal 7506371035

[5:23 pm, 9/7/2025] Jinesh Hacker House: Available Commercial Office space for Sale👉Near Thane Station(G +1) :- 540sqft / 2.40Cr👉Castle Mill :- 1100sqft / 2.65Cr👉wagle Estate :- 1136sqft / 1.25CrFor more details please contact below number 👇Avenue PropertiesBhagyashri 8433950317Vishal 7506371035

[5:23 pm, 9/7/2025] Jinesh Hacker House: Available 1 BHK rental semi furnished lokupvan rent 28 k  bachelor allow  owner side brockarege 10 k keys with me Gautam Singh mobile number 9892393294

[5:23 pm, 9/7/2025] Jinesh Hacker House: Available for 3 bhk furnished flat for rent Hiranandani meadows rent 1 lakhs negotiable diposit 6 time call me Gautam Singh mobile number 9892393294

[5:23 pm, 9/7/2025] Jinesh Hacker House: Green Acres Phase IIBehind Tjsb BankGhodbunder roadWaghbil naka,3 BHK DuplexCarpet Area: 845+2 GalleriesEast-WestGarden FacingWith Car Parking Rs,1.25 cr negotiable Call Gautam Singh Mobile; 9892393294

[5:23 pm, 9/7/2025] Jinesh Hacker House: Sheth vasant Athena 2 bhk semi furnished 700 sqft carpet area Asking price.1.55 Cr negotiable keys available call me Gautam Singh mobile number 9892393294

[5:23 pm, 9/7/2025] Jinesh Hacker House: Puranik City phase 3, sale 2.5 BHK carpet around 850 sqft Asking price. 1.15 Cr negotiable keys with me call Gautam Singh mobile number 9892393294

[5:23 pm, 9/7/2025] Jinesh Hacker House: Acme ozone phase 2, sale 2 bhk 680 sqft carpet area 1.40 Cr negotiable higher floor, call me Gautam Singh mobile number 9892393294

[5:23 pm, 9/7/2025] Jinesh Hacker House: Mahaveer squaire 2 bhk sale 680 sqft carpet 3 balcony asking price 1.30 Cr negotiable keys with me call Gautam Singh mobile number 9892393294

[5:23 pm, 9/7/2025] Jinesh Hacker House: Green woods Oxford building near tulsidham 1 BHK 480 sqft carpet area Asking price 75 lakhs negotiable keys available call me Gautam Singh mobile number 9892393294

[5:23 pm, 9/7/2025] Jinesh Hacker House: 🏆COMMERCIAL SPACE FOR RENT AT PAACHPAKHADI NR.HARINIVAS CIRCLE LBS ROAD THANE WESTHIGHLY CROWDED AREAVERY VERY PRIME LOCATIONCARPET AREA 1525 SQFTHEIGHT 23 FTBIG FRONTAGE 22FTUSE FOR,VEG HOTEL, SHOWROOM, JWELLERY SHOP, MOBILE GALLARY,ETCRENT 500 RS PER SQFT NEGDEP RENT 6 TIME NEG      VIDEO & PHOTO AVL*Call me Gautam Singh mobile number 9892393294

[5:23 pm, 9/7/2025] Jinesh Hacker House: 🔥Urgent resale  and investors flat 🔥1)Piramal vaikunth 2-2 bhk flats 1100 carpet Preleased 65k/month rent revision in march 25 2.40cr pkg 2) 2 bhk 610 carpetRustomjee atelierFully furnishedNewly renovated 1.05 cr  also available other units at 1 cr onwards.3) Distress sell Lodha Sterling 2 bhk 820 sqft + 200 sqft garden1.80 cr Very premium interior done4) 2 bhk 650 carpet Possession in 6 months Mahavir Spring Pokhran road1.55Cr  5) 2 bhk 850 carpet Rustomjee Azziano Higher floor Distress sale 1.44 cr Multiple units available from 1.40cr to 1.65 cr 6) 2 bhk 740 carpet Tata Serein Hill facingPremium Unit 1.85Cr 8) piramal Vaikunth2 bhk 570 carpet 5-6 units available Pricing 1.10cr to 1.30vr10) 3 bhk unused flat for s

[5:23 pm, 9/7/2025] Jinesh Hacker House: 2 BHK FLAT FOR RENT Raymond Carpet :-595 Sqft + balconyRent :- 42KModular kitchen1 Car Parking Note - owner site half brokerageArnav PropertiesKiran GaikwadNilesh 7400330979

[5:23 pm, 9/7/2025] Jinesh Hacker House: ☎AVAILABLE OFFICE SPACE FOR RENT ☎    ‼️FURNISHED OFFICE‼️ ▫Carpet:- 1287   /-Sqft ▫Rent:- 150 rs On Carpet final ▫Location:- Fenkin 9 , Wagle Eatate✨Available Multiple Offices For BUY-SALE-RENTAny Enquiries Please Call  ARNAV PROPERTIES⚡ Kiran Gaikwad🪀      9833636699Prathmesh9152480462

[5:23 pm, 9/7/2025] Jinesh Hacker House: 🍁PRIME LOCATION COMMERCIAL SPACE AVAILABLE FOR RENT🍁MAZHIWADA LOCATION Road facing (Ideal for diagnostic centre, insurance back office,bank back office, call center)Carpet area-4000sqftRent- 5lac Negotiate MANPADA LOCATION(Semi furnished)Road facing (Ideal for clinic, pathology,Black office)Carpet -390sqftRent- 65 kNegotiable MANPADA LOCATION First floor Road facing 390sqftRent-60kNegotiable KOLSHET LOCATION First floor Road facing Carpet-600sqftRent- 1.35ac Negotiable (Note-Deal will be side by side)Any Enquiries Please Call  ARNAV PROPERTIESKiran GaikwadUddhav 9112204207

[5:23 pm, 9/7/2025] Jinesh Hacker House: 🏡3BHK FLAT FOR SALE🏡Near Tekdi Bunglow Panch Pakhadi Thane West 1Bhk+1Bhk Jodi FlatEast Facing Semi Furnished Carpet :- 867 SqftCost :- 02 CR NParking :- 2 Car ParkArnav Properties Kiran Gaikwad Jay Patil 9768671333

[5:23 pm, 9/7/2025] Jinesh Hacker House: 📢 3 BHK Available for Sale 📢🏡 3 BHK🏢 Rustomjee Azziano📍 Majiwada📐 Carpet Area : 1180 sq. ft.💰 Price: ₹ 2.75 Cr. nego.🚗 Parking: Covered🌇 Floor - Higher🏠 Fully Furnished (Lavish)----------------------------------------------🏡 3 BHK🏢 Lodha Luxuria📍 Majiwada📐 Carpet Area : 1250 sq. ft.💰 Price: ₹ 2.70 Cr. nego.🚗 Parking: Covered🌇 Floor : Higher----------------------------------------------🏡 3 BHK🏢 Vasant Fiona📍 Majiwada📐 Carpet Area : 900 sq. ft.💰 Price: ₹ 2.40 Cr. nego.🚗 Parking: Covered🌇 Floor - Middle🏡 Fully Furnished----------------------------------------------Prateek📲 7304912425

[5:23 pm, 9/7/2025] Jinesh Hacker House: 📢 Available for Rent 📢🏡 1 BHK📍 Kapurbawdi📐 Carpet Area : 456 sq. ft.💰 Price: ₹40,000/- nego.🚗 Parking: Covered🌇 Floor - Middle🏠 Fully Furnished (Lavish)🧑‍⚖️ Bachelors & Family Allowed----------------------------------------------🏡 2 BHK🏢 Rustomjee Azziano📍 Majiwada📐 Carpet Area : 738 sq. ft.💰 Price: ₹47,000/- nego.🚗 Parking: Covered🌇 Floor : Middle🏡 Semi Furnished----------------------------------------------🏡 3 BHK🏢 Auralis📍 Louiswadi📐 Carpet Area : 1228 sq. ft.💰 Price: ₹75,000/- nego.🚗 Parking: Covered🌇 Floor - Middle🏡 Semi Furnished----------------------------------------------🏡 2 BHK🏢 Piramal Vaikunth📍 Balkum📐 Carpet Area : 708 sq. ft.💰 Price: ₹41,000 - 45,000/-🚗 Parking: Covered🌇 Floor`

interface PropertyData {
  id: string
  timestamp: string
  sender: string
  propertyType: "Residential" | "Commercial" | "Office"
  transactionType: "Rent" | "Sale"
  bhkType: string
  address: string
  pinCode: string
  carpetArea: string
  price: string
  priceNumeric: number
  condition: string
  floor: string
  parking: boolean
  contact: string[]
  amenities: string[]
  possession: string
  deposit: string
  rawMessage: string
}

interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  suggestions?: string[]
}

type SortField = keyof PropertyData
type SortDirection = "asc" | "desc"

// Enhanced parsing function (same as before)
function parseWhatsAppData(data: string): PropertyData[] {
  const messagePattern = /\[(.*?)\]\s*(.*?):\s*(.*?)(?=\[|$)/gs
  const messages: PropertyData[] = []
  let match

  while ((match = messagePattern.exec(data)) !== null) {
    const [, timestamp, sender, content] = match
    const text = content.trim()

    if (!text) continue

    // Extract property type
    let propertyType: "Residential" | "Commercial" | "Office" = "Residential"
    if (/office|commercial|shop|retail/i.test(text)) {
      propertyType = /office/i.test(text) ? "Office" : "Commercial"
    }

    // Extract transaction type
    const transactionType: "Rent" | "Sale" = /rent|rental/i.test(text) ? "Rent" : "Sale"

    // Extract BHK type
    const bhkMatch = text.match(/(\d+(?:\.\d+)?)\s*bhk/i)
    const bhkType = bhkMatch ? `${bhkMatch[1]} BHK` : propertyType === "Office" ? "Office Space" : "Commercial Space"

    // Extract address and pin code
    const { address, pinCode } = extractAddressAndPin(text)

    // Extract carpet area
    const areaMatch =
      text.match(/(?:carpet|area).*?(\d+)\s*(?:sq\.?\s*ft|sqft)/i) ||
      text.match(/(\d+)\s*(?:sq\.?\s*ft|sqft)/i) ||
      text.match(/(\d+)\s*c(?:\s|$)/i)
    const carpetArea = areaMatch ? `${areaMatch[1]} sq ft` : ""

    // Extract price with better parsing
    const { price, priceNumeric } = extractPrice(text)

    // Extract condition
    const conditionMatch = text.match(/(furnished|semi furnished|unfurnished|warmshell|ready)/i)
    const condition = conditionMatch ? conditionMatch[1] : ""

    // Extract floor
    const floorMatch = text.match(/(\d+)(?:st|nd|rd|th)?\s*floor/i)
    const floor = floorMatch ? `${floorMatch[1]} Floor` : ""

    // Check parking
    const parking = /parking/i.test(text)

    // Extract contacts
    const contactMatches = text.match(/\d{10}/g) || []
    const contact = [...new Set(contactMatches)]

    // Extract amenities
    const amenities = extractAmenities(text)

    // Extract possession
    const possessionMatch = text.match(/possession[:\s]*([^.\n]+)/i)
    const possession = possessionMatch ? possessionMatch[1].trim() : ""

    // Extract deposit
    const depositMatch = text.match(/deposit[:\s-]*([^.\n]+)/i)
    const deposit = depositMatch ? depositMatch[1].trim() : ""

    messages.push({
      id: `property-${messages.length + 1}`,
      timestamp: timestamp.trim(),
      sender: sender.trim(),
      propertyType,
      transactionType,
      bhkType,
      address,
      pinCode,
      carpetArea,
      price,
      priceNumeric,
      condition,
      floor,
      parking,
      contact,
      amenities,
      possession,
      deposit,
      rawMessage: text,
    })
  }

  return messages
}

function extractAddressAndPin(text: string): { address: string; pinCode: string } {
  // Extract pin code
  const pinMatch = text.match(/(\d{6})/g)
  const pinCode = pinMatch ? pinMatch[0] : ""

  // Extract address - look for location indicators
  const locationPatterns = [
    /(?:@|at|near|opp|location)\s+([^.\n]+?)(?:\s+\d{6}|project|rent|₹|carpet|available)/i,
    /(charai|thane|pachpakhadi|park woods|garden enclave|makhmali talao|hiranandani|ghodbunder)[^.\n]*?(?:\s+\d{6})?/i,
  ]

  let address = ""
  for (const pattern of locationPatterns) {
    const match = text.match(pattern)
    if (match) {
      address = match[1] || match[0]
      break
    }
  }

  // Clean up address
  address = address.replace(/\d{6}/, "").trim()

  return { address: address || "Address not specified", pinCode }
}

function extractPrice(text: string): { price: string; priceNumeric: number } {
  const pricePatterns = [
    /(?:rent|price)[:\s-]*₹?\s*([₹\d,.\s]+(?:lac|cr|k|lakh|crore)?)/i,
    /₹\s*([₹\d,.\s]+(?:lac|cr|k|lakh|crore)?)/i,
    /(\d+(?:,\d+)*)\s*(?:lac|cr|k|lakh|crore)/i,
  ]

  for (const pattern of pricePatterns) {
    const match = text.match(pattern)
    if (match) {
      const priceStr = match[1].trim()
      const priceNumeric = convertPriceToNumber(priceStr)
      return { price: priceStr, priceNumeric }
    }
  }

  return { price: "Price on request", priceNumeric: 0 }
}

function convertPriceToNumber(priceStr: string): number {
  const cleanPrice = priceStr.replace(/[₹,\s]/g, "")
  const numMatch = cleanPrice.match(/(\d+(?:\.\d+)?)/)

  if (!numMatch) return 0

  const num = Number.parseFloat(numMatch[1])

  if (/cr|crore/i.test(priceStr)) return num * 10000000
  if (/lac|lakh/i.test(priceStr)) return num * 100000
  if (/k/i.test(priceStr)) return num * 1000

  return num
}

function extractAmenities(text: string): string[] {
  const amenityKeywords = [
    "gym",
    "pool",
    "garden",
    "parking",
    "lift",
    "security",
    "playground",
    "clubhouse",
    "swimming pool",
    "balcony",
    "washroom",
    "kitchen",
  ]

  const found: string[] = []
  amenityKeywords.forEach((amenity) => {
    if (new RegExp(amenity, "i").test(text)) {
      found.push(amenity.charAt(0).toUpperCase() + amenity.slice(1))
    }
  })

  return found
}

// Welcome Character Component
function WelcomeCharacter({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentMessage, setCurrentMessage] = useState(0)
  const { theme } = useTheme()

  const welcomeMessages = [
    "👋 Welcome to your Real Estate Dashboard!",
    "🏠 I'm Realty, your AI assistant!",
    "✨ Let me help you explore properties from WhatsApp!",
    "🔍 Use filters to find your perfect match!",
  ]

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/[👋🏠✨🔍]/gu, ""))
      utterance.rate = 0.9
      utterance.pitch = 1.1
      utterance.volume = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    if (isVisible) {
      speak(welcomeMessages[0])
      const interval = setInterval(() => {
        setCurrentMessage((prev) => {
          const next = (prev + 1) % welcomeMessages.length
          if (next === 0) {
            setTimeout(() => {
              setIsVisible(false)
              onClose()
            }, 3000)
          }
          return next
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative">
        {/* Character */}
        <div className="relative animate-bounce">
          <div
            className={`w-32 h-32 rounded-full ${theme === "dark" ? "bg-gradient-to-br from-blue-400 to-purple-600" : "bg-gradient-to-br from-blue-500 to-purple-700"} flex items-center justify-center shadow-2xl animate-pulse`}
          >
            <div className="text-6xl animate-spin-slow">🏠</div>
          </div>

          {/* Sparkles */}
          <div className="absolute -top-2 -right-2 animate-ping">
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-ping delay-300">
            <Star className="h-5 w-5 text-pink-400" />
          </div>
          <div className="absolute top-1/2 -right-4 animate-ping delay-500">
            <Zap className="h-4 w-4 text-green-400" />
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-80">
          <div
            className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-2xl p-4 shadow-xl border-2 border-blue-200 dark:border-blue-800 relative animate-in slide-in-from-bottom-4`}
          >
            <p className="text-center font-medium text-lg">{welcomeMessages[currentMessage]}</p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div
                className={`w-0 h-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent ${theme === "dark" ? "border-t-gray-800" : "border-t-white"}`}
              ></div>
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <Button
          onClick={() => {
            setIsVisible(false)
            onClose()
          }}
          variant="outline"
          size="sm"
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
        >
          Skip Intro
        </Button>
      </div>
    </div>
  )
}

// Animated Chatbot Component
function AnimatedChatbot({ data }: { data: PropertyData[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi! I'm Realty Bot 🏠 How can I help you find the perfect property today?",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "Show me 2 BHK properties",
        "Find properties under 1 Cr",
        "Show commercial spaces",
        "Properties in Thane",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const { theme } = useTheme()

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/[🏠🔍✨💡🎯]/gu, ""))
      utterance.rate = 0.9
      utterance.pitch = 1.2
      utterance.volume = 0.7
      speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onstart = () => {
        setIsListening(true)
      }

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  const generateBotResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase()

    // Enhanced responses for specific projects/locations
    if (message.includes("tata serein") || message.includes("serein")) {
      const sereinProperties = data.filter(
        (p) => p.address.toLowerCase().includes("tata serein") || p.rawMessage.toLowerCase().includes("tata serein"),
      )
      return {
        text: `🏢 Tata Serein has ${sereinProperties.length} properties available! Premium location with excellent amenities.`,
        suggestions: [
          "Show Tata Serein prices",
          "Compare with other projects",
          "Show higher floor units",
          "Contact details",
        ],
      }
    }

    if (message.includes("hiranandani") || message.includes("meadows")) {
      const hirananProperties = data.filter(
        (p) => p.address.toLowerCase().includes("hiranandani") || p.rawMessage.toLowerCase().includes("hiranandani"),
      )
      return {
        text: `🌟 Hiranandani projects have ${hirananProperties.length} properties! Premium gated community with world-class facilities.`,
        suggestions: ["Show Hiranandani Meadows", "Show Hiranandani Estate", "Furnished options", "Rental properties"],
      }
    }

    if (message.includes("lodha") || message.includes("amara") || message.includes("sterling")) {
      const lodhaProperties = data.filter((p) => p.rawMessage.toLowerCase().includes("lodha"))
      return {
        text: `🏗️ Lodha Group has ${lodhaProperties.length} excellent properties! Known for quality construction and premium amenities.`,
        suggestions: ["Show Lodha Amara", "Show Lodha Sterling", "Show Lodha Crown", "Price comparison"],
      }
    }

    if (message.includes("vasant vihar") || message.includes("vasant")) {
      const vasantProperties = data.filter(
        (p) => p.address.toLowerCase().includes("vasant") || p.rawMessage.toLowerCase().includes("vasant"),
      )
      return {
        text: `🌺 Vasant Vihar has ${vasantProperties.length} properties! Great connectivity and family-friendly environment.`,
        suggestions: ["Show 1 BHK in Vasant Vihar", "Show 2 BHK options", "Furnished properties", "Price range"],
      }
    }

    if (message.includes("raymond") || message.includes("raymond ten x")) {
      const raymondProperties = data.filter((p) => p.rawMessage.toLowerCase().includes("raymond"))
      return {
        text: `🏢 Raymond properties available! Premium location with excellent connectivity and modern amenities.`,
        suggestions: ["Show Raymond prices", "Show carpet area", "Rental options", "Contact broker"],
      }
    }

    if (message.includes("furnished") || message.includes("ff") || message.includes("semi furnished")) {
      const furnishedProperties = data.filter(
        (p) =>
          p.condition.toLowerCase().includes("furnished") ||
          p.rawMessage.toLowerCase().includes("furnished") ||
          p.rawMessage.toLowerCase().includes("f.f"),
      )
      return {
        text: `🛋️ Found ${furnishedProperties.length} furnished properties! Move-in ready with all amenities.`,
        suggestions: ["Fully furnished only", "Semi furnished", "Unfurnished options", "Furniture details"],
      }
    }

    if (message.includes("bachelor") || message.includes("single")) {
      const bachelorProperties = data.filter((p) => p.rawMessage.toLowerCase().includes("bachelor"))
      return {
        text: `👨‍💼 Found bachelor-friendly properties! Several options allow working professionals and students.`,
        suggestions: ["Show bachelor flats", "Shared accommodation", "Studio apartments", "PG options"],
      }
    }

    if (message.includes("investment") || message.includes("investor") || message.includes("prelease")) {
      const investmentProperties = data.filter(
        (p) =>
          p.rawMessage.toLowerCase().includes("investment") ||
          p.rawMessage.toLowerCase().includes("prelease") ||
          p.rawMessage.toLowerCase().includes("return"),
      )
      return {
        text: `💼 Great investment opportunities available! Properties with good rental yields and appreciation potential.`,
        suggestions: ["Show ROI details", "Prelease properties", "Commercial investments", "Rental yields"],
      }
    }

    if (message.includes("urgent") || message.includes("distress") || message.includes("immediate")) {
      const urgentProperties = data.filter(
        (p) => p.rawMessage.toLowerCase().includes("urgent") || p.rawMessage.toLowerCase().includes("distress"),
      )
      return {
        text: `⚡ Found urgent sale properties! Great deals with immediate possession and negotiable prices.`,
        suggestions: ["Show distress sales", "Immediate possession", "Best deals", "Negotiable prices"],
      }
    }

    if (message.includes("majiwada") || message.includes("manpada") || message.includes("waghbil")) {
      const locationProperties = data.filter(
        (p) =>
          p.address.toLowerCase().includes("majiwada") ||
          p.address.toLowerCase().includes("manpada") ||
          p.address.toLowerCase().includes("waghbil") ||
          p.rawMessage.toLowerCase().includes("majiwada") ||
          p.rawMessage.toLowerCase().includes("manpada") ||
          p.rawMessage.toLowerCase().includes("waghbil"),
      )
      return {
        text: `📍 Found ${locationProperties.length} properties in prime locations! Excellent connectivity and infrastructure.`,
        suggestions: ["Show Majiwada properties", "Show Manpada area", "Show Waghbil options", "Connectivity details"],
      }
    }

    if (message.includes("carpet area") || message.includes("sqft") || message.includes("area")) {
      return {
        text: `📐 I can help you find properties by carpet area! What size are you looking for?`,
        suggestions: ["Under 500 sqft", "500-800 sqft", "800-1200 sqft", "Above 1200 sqft"],
      }
    }

    if (message.includes("contact") || message.includes("broker") || message.includes("agent")) {
      const contactInfo = data.filter((p) => p.contact.length > 0)
      return {
        text: `📞 I have contact details for ${contactInfo.length} properties! I can connect you with verified brokers.`,
        suggestions: ["Show broker contacts", "Direct owner deals", "Verified agents", "Property visits"],
      }
    }

    // Original responses for basic queries
    if (message.includes("bhk") || message.includes("bedroom")) {
      const bhkProperties = data.filter((p) => p.bhkType.toLowerCase().includes("bhk"))
      return {
        text: `🏠 I found ${bhkProperties.length} BHK properties! Here are some options based on your search.`,
        suggestions: ["Show 1 BHK only", "Show 2 BHK only", "Show 3 BHK only", "Show all residential"],
      }
    }

    if (message.includes("price") || message.includes("cost") || message.includes("budget")) {
      return {
        text: "💰 I can help you find properties within your budget! What's your price range?",
        suggestions: ["Under 50 lakhs", "50L - 1 Cr", "1-2 Cr", "Above 2 Cr"],
      }
    }

    if (message.includes("commercial") || message.includes("office")) {
      const commercialProperties = data.filter((p) => p.propertyType === "Commercial" || p.propertyType === "Office")
      return {
        text: `🏢 Found ${commercialProperties.length} commercial properties! Perfect for business ventures.`,
        suggestions: ["Show office spaces", "Show retail shops", "Show ground floor", "Show furnished offices"],
      }
    }

    if (message.includes("thane") || message.includes("location")) {
      const thaneProperties = data.filter((p) => p.address.toLowerCase().includes("thane"))
      return {
        text: `📍 Great choice! Thane has ${thaneProperties.length} properties available. It's a prime location!`,
        suggestions: ["Show Thane West", "Show Thane East", "Near railway station", "Show pin codes"],
      }
    }

    if (message.includes("rent") || message.includes("rental")) {
      const rentProperties = data.filter((p) => p.transactionType === "Rent")
      return {
        text: `🔑 I found ${rentProperties.length} rental properties! Ready to move in options available.`,
        suggestions: ["Furnished rentals", "Under 50k rent", "Family friendly", "Bachelor friendly"],
      }
    }

    if (message.includes("parking") || message.includes("amenities")) {
      const parkingProperties = data.filter((p) => p.parking)
      return {
        text: `🚗 ${parkingProperties.length} properties come with parking! I can also show other amenities.`,
        suggestions: ["Show gym facilities", "Show swimming pool", "Show garden view", "Show lift access"],
      }
    }

    return {
      text: "✨ I'm here to help! You can ask me about specific projects, locations, prices, or any requirements. Try asking about Tata Serein, Hiranandani, or Lodha properties!",
      suggestions: ["Show premium projects", "Best investment options", "Furnished properties", "Bachelor friendly"],
    }
  }

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        suggestions: botResponse.suggestions,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
      speak(botResponse.text)
    }, 1500)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen ? "rotate-180" : "animate-bounce"
        } bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!isOpen && <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
            </div>
            <div>
              <h3 className="font-semibold text-white">Realty Bot</h3>
              <p className="text-xs text-white/80">Online • Ready to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] ${message.isBot ? "order-2" : "order-1"}`}>
                  {message.isBot && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="h-4 w-4 text-blue-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Realty Bot</span>
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl ${
                      message.isBot
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    } animate-in slide-in-from-bottom-2`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendMessage(suggestion)}
                          className="text-xs mr-1 mb-1 h-7 bg-transparent hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about properties..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="pr-12 rounded-full border-2 focus:border-blue-500 transition-all duration-200"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={isListening ? stopListening : startListening}
                  className={`absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full ${
                    isListening ? "bg-red-100 text-red-600 animate-pulse" : "hover:bg-gray-100"
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Mobile Property Card Component
function PropertyCard({ item, index }: { item: PropertyData; index: number }): ReactElement {
  return (
    <Card className="mb-4 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-in slide-in-from-bottom-4 dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`text-xs transition-colors duration-200 ${
                item.propertyType === "Residential"
                  ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                  : item.propertyType === "Commercial"
                    ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                    : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
              }`}
            >
              {item.propertyType}
            </Badge>
            <Badge
              variant={item.transactionType === "Rent" ? "default" : "secondary"}
              className={`text-xs transition-colors duration-200 ${
                item.transactionType === "Rent"
                  ? "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
                  : "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800"
              }`}
            >
              {item.transactionType}
            </Badge>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{item.id}</span>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">{item.bhkType}</h3>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{item.address}</span>
              {item.pinCode && (
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{item.pinCode}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Area</span>
              <p className="font-medium text-gray-900 dark:text-gray-100">{item.carpetArea || "N/A"}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Price</span>
              <div className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4 text-gray-400" />
                <p className="font-semibold text-gray-900 dark:text-gray-100">{item.price}</p>
              </div>
            </div>
          </div>

          {(item.condition || item.floor) && (
            <div className="grid grid-cols-2 gap-4">
              {item.condition && (
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Condition</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.condition}</p>
                </div>
              )}
              {item.floor && (
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Floor</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.floor}</p>
                </div>
              )}
            </div>
          )}

          {(item.amenities.length > 0 || item.parking) && (
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                Features
              </span>
              <div className="flex flex-wrap gap-1">
                {item.parking && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    Parking
                  </Badge>
                )}
                {item.amenities.slice(0, 3).map((amenity, i) => (
                  <Badge key={i} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                    {amenity}
                  </Badge>
                ))}
                {item.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                    +{item.amenities.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {item.contact.length > 0 && (
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                Contact
              </span>
              <div className="space-y-1">
                {item.contact.slice(0, 2).map((contact, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{contact}</span>
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                      Call
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="h-3 w-3" />
              {item.timestamp.split(",")[0]}
            </div>
            <Button size="sm" variant="default" className="h-7 px-3 text-xs">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function WhatsAppExcelTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>("all")
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<string>("all")
  const [pinCodeFilter, setPinCodeFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("timestamp")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)

  const { theme, setTheme } = useTheme()

  const data = useMemo(() => parseWhatsAppData(sampleWhatsAppData), [])

  const uniquePinCodes = useMemo(() => {
    const pins = [...new Set(data.map((item) => item.pinCode).filter(Boolean))]
    return pins.sort()
  }, [data])

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter((item) => {
      const matchesSearch =
        item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bhkType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contact.some((c) => c.includes(searchTerm))

      const matchesPropertyType = propertyTypeFilter === "all" || item.propertyType === propertyTypeFilter
      const matchesTransactionType = transactionTypeFilter === "all" || item.transactionType === transactionTypeFilter
      const matchesPinCode = pinCodeFilter === "all" || item.pinCode === pinCodeFilter

      return matchesSearch && matchesPropertyType && matchesTransactionType && matchesPinCode
    })

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === "priceNumeric") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [data, searchTerm, propertyTypeFilter, transactionTypeFilter, pinCodeFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const SortableHeader = ({ field, children }: { field: SortField; children: ReactElement }) => (
    <TableHead
      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 select-none border-r border-gray-200 dark:border-gray-700 transition-colors duration-200"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className="h-3 w-3 text-gray-400 transition-transform duration-200" />
      </div>
    </TableHead>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Building className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
              Loading WhatsApp Data...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Parsing real estate properties</p>
          </div>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-all duration-500 p-2 sm:p-4">
      {/* Welcome Character */}
      {showWelcome && <WelcomeCharacter onClose={() => setShowWelcome(false)} />}

      {/* Animated Chatbot */}
      <AnimatedChatbot data={data} />

      <div className="max-w-full mx-auto space-y-4">
        {/* Header */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md transition-all duration-300 hover:shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="animate-in slide-in-from-left-4 duration-500">
                <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl text-gray-900 dark:text-gray-100">
                  <div className="relative">
                    <Building className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    WhatsApp Real Estate Data
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  Parsed from Twilio • {filteredAndSortedData.length} properties found
                </p>
              </div>
              <div className="flex items-center gap-3 animate-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                  <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="hidden sm:flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-all duration-200 hover:scale-105 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 hover:border-blue-300"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-all duration-200 hover:scale-105 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 hover:border-purple-300"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Mobile Filter Toggle */}
        <div className="sm:hidden">
          <Button
            variant="outline"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="w-full justify-between transition-all duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-[1.02]"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters & Search
            </div>
            {isMobileFiltersOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Filters */}
        <Card
          className={`shadow-lg transition-all duration-300 ${isMobileFiltersOpen || "hidden sm:block"} bg-white/90 dark:bg-gray-800/90 backdrop-blur-md hover:shadow-xl`}
        >
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="relative animate-in slide-in-from-bottom-2 duration-300">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 transition-colors duration-200" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-9 transition-all duration-200 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700/50 dark:border-gray-600 backdrop-blur-sm"
                />
              </div>

              <Select value={propertyTypeFilter} onValueChange={setPropertyTypeFilter}>
                <SelectTrigger className="h-9 transition-all duration-200 hover:border-blue-300 dark:bg-gray-700/50 dark:border-gray-600 backdrop-blur-sm">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700 backdrop-blur-md">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Residential">🏠 Residential</SelectItem>
                  <SelectItem value="Commercial">🏢 Commercial</SelectItem>
                  <SelectItem value="Office">🏬 Office</SelectItem>
                </SelectContent>
              </Select>

              <Select value={transactionTypeFilter} onValueChange={setTransactionTypeFilter}>
                <SelectTrigger className="h-9 transition-all duration-200 hover:border-blue-300 dark:bg-gray-700/50 dark:border-gray-600 backdrop-blur-sm">
                  <SelectValue placeholder="Transaction" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700 backdrop-blur-md">
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="Rent">🔑 For Rent</SelectItem>
                  <SelectItem value="Sale">💰 For Sale</SelectItem>
                </SelectContent>
              </Select>

              <Select value={pinCodeFilter} onValueChange={setPinCodeFilter}>
                <SelectTrigger className="h-9 transition-all duration-200 hover:border-blue-300 dark:bg-gray-700/50 dark:border-gray-600 backdrop-blur-sm">
                  <SelectValue placeholder="Pin Code" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700 backdrop-blur-md">
                  <SelectItem value="all">All Pin Codes</SelectItem>
                  {uniquePinCodes.map((pin) => (
                    <SelectItem key={pin} value={pin}>
                      📍 {pin}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 animate-in fade-in duration-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-2">
                <Filter className="h-4 w-4" />
                <span className="font-medium">{filteredAndSortedData.length}</span> of {data.length} properties
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile View - Cards */}
        <div className="sm:hidden space-y-4">
          {filteredAndSortedData.map((item, index) => (
            <PropertyCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Desktop View - Table */}
        <Card className="shadow-lg hidden sm:block bg-white/90 dark:bg-gray-800/90 backdrop-blur-md transition-all duration-300 hover:shadow-xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="border-collapse">
                <TableHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
                  <TableRow className="border-b-2 border-gray-200 dark:border-gray-700">
                    <SortableHeader field="id">ID</SortableHeader>
                    <SortableHeader field="timestamp">Date/Time</SortableHeader>
                    <SortableHeader field="propertyType">Type</SortableHeader>
                    <SortableHeader field="transactionType">Transaction</SortableHeader>
                    <SortableHeader field="bhkType">BHK/Config</SortableHeader>
                    <SortableHeader field="address">Address</SortableHeader>
                    <SortableHeader field="pinCode">Pin Code</SortableHeader>
                    <SortableHeader field="carpetArea">Area</SortableHeader>
                    <SortableHeader field="priceNumeric">Price</SortableHeader>
                    <SortableHeader field="condition">Condition</SortableHeader>
                    <SortableHeader field="floor">Floor</SortableHeader>
                    <TableHead className="border-r border-gray-200 dark:border-gray-700">Features</TableHead>
                    <SortableHeader field="contact">Contact</SortableHeader>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedData.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 ${
                        index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/50 dark:bg-gray-800/50"
                      } border-b border-gray-100 dark:border-gray-700 animate-in slide-in-from-bottom-2 hover:scale-[1.01]`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell className="border-r border-gray-200 dark:border-gray-700 font-mono text-xs">
                        {item.id}
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          {item.timestamp.split(",")[0]}
                        </div>
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700">
                        <Badge
                          variant="outline"
                          className={`text-xs transition-all duration-200 hover:scale-105 ${
                            item.propertyType === "Residential"
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                              : item.propertyType === "Commercial"
                                ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                                : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                          }`}
                        >
                          {item.propertyType}
                        </Badge>
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700">
                        <Badge
                          variant={item.transactionType === "Rent" ? "default" : "secondary"}
                          className={`text-xs transition-all duration-200 hover:scale-105 ${
                            item.transactionType === "Rent"
                              ? "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
                              : "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800"
                          }`}
                        >
                          {item.transactionType}
                        </Badge>
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700 font-medium text-sm">
                        {item.bhkType}
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700 max-w-xs">
                        <div className="flex items-start gap-1">
                          <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm truncate">{item.address}</span>
                        </div>
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700 font-mono text-sm">
                        {item.pinCode || "-"}
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700 text-sm font-medium">
                        {item.carpetArea || "-"}
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3 text-gray-400" />
                          <span className="text-sm font-medium">{item.price}</span>
                        </div>
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700 text-sm">
                        {item.condition || "-"}
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700 text-sm">
                        {item.floor || "-"}
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-1">
                          {item.parking && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 transition-all duration-200 hover:scale-105"
                            >
                              🚗 Parking
                            </Badge>
                          )}
                          {item.amenities.slice(0, 2).map((amenity, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs transition-all duration-200 hover:scale-105 dark:border-gray-600 dark:text-gray-300"
                            >
                              {amenity}
                            </Badge>
                          ))}
                          {item.amenities.length > 2 && (
                            <Badge
                              variant="outline"
                              className="text-xs transition-all duration-200 hover:scale-105 dark:border-gray-600 dark:text-gray-300"
                            >
                              +{item.amenities.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="border-r border-gray-200 dark:border-gray-700">
                        <div className="space-y-1">
                          {item.contact.slice(0, 2).map((contact, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span className="text-xs font-mono">{contact}</span>
                            </div>
                          ))}
                          {item.contact.length > 2 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{item.contact.length - 2} more
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAndSortedData.length === 0 && (
              <div className="text-center py-12 animate-in fade-in duration-500">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No properties found</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              value: filteredAndSortedData.filter((item) => item.transactionType === "Rent").length,
              label: "For Rent",
              color: "text-blue-600 dark:text-blue-400",
              bgColor: "from-blue-500 to-blue-600",
              icon: Home,
            },
            {
              value: filteredAndSortedData.filter((item) => item.transactionType === "Sale").length,
              label: "For Sale",
              color: "text-green-600 dark:text-green-400",
              bgColor: "from-green-500 to-green-600",
              icon: TrendingUp,
            },
            {
              value: filteredAndSortedData.filter((item) => item.propertyType === "Residential").length,
              label: "Residential",
              color: "text-purple-600 dark:text-purple-400",
              bgColor: "from-purple-500 to-purple-600",
              icon: Home,
            },
            {
              value: uniquePinCodes.length,
              label: "Pin Codes",
              color: "text-orange-600 dark:text-orange-400",
              bgColor: "from-orange-500 to-orange-600",
              icon: MapPin,
            },
          ].map((stat, index) => (
            <Card
              key={stat.label}
              className="shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md animate-in slide-in-from-bottom-4 overflow-hidden group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-4 sm:pt-6 relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <div className="text-center relative z-10">
                  <div className="flex items-center justify-center mb-2">
                    <div className={`p-2 rounded-full bg-gradient-to-br ${stat.bgColor} bg-opacity-10`}>
                      {React.createElement(stat.icon, { className: `h-5 w-5 sm:h-6 sm:w-6 ${stat.color}` })}
                    </div>
                  </div>
                  <div className={`text-xl sm:text-2xl font-bold ${stat.color} animate-pulse`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
