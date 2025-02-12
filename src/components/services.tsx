import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Car,
  Truck,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { FaTruckPickup, FaCar, FaCarSide, FaTruckMonster } from "react-icons/fa";

export default function CombinedServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<number[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [selectedPolishOption, setSelectedPolishOption] = useState<number | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [summaryText, setSummaryText] = useState<string>("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const vehicles = [
    { type: "Coupe", addedFee: 0, icon: FaCar },
    { type: "Sedan", addedFee: 10, icon: FaCarSide },
    { type: "Small Truck", addedFee: 20, icon: FaTruckPickup },
    { type: "Big Truck", addedFee: 30, icon: FaTruckMonster },
    { type: "SUV", addedFee: 30, icon: Car },
  ];

  const services = [
    {
      id: 1,
      type: "package",
      name: "Maintenance Interior Clean",
      basePrice: 50,
      description: "A routine interior cleaning to keep your car fresh.",
      features: ["Carpet and Seat Shampoo", "Minimal Stain Removal", "Full Console and Dashboard Wipe Down", "Vacuuming"],
    },
    {
      id: 2,
      type: "package",
      name: "Extreme Interior Deep Clean",
      basePrice: 80,
      description: "A comprehensive interior overhaul for a like-new feel.",
      features: ["Full Dashboard and Console Deep Clean", "Carpet Shampoo/Extraction", "Leather Conditioning", "Stain Removal", "Vacuuming", "Pet Hair Removal"],
    },
    {
      id: 3,
      type: "package",
      name: "Exterior Deep Clean",
      basePrice: 50,
      description: "A top-to-bottom exterior transformation for your vehicle.",
      features: ["Tire and Rim Deep Clean", "Clay Bar Treatment", "Headlight Restoration","Exhaust Tips Clean","Quick Spray Wax","Plastic Trim Restoration"],
    },
    {
      id: 4,
      type: "package",
      name: "Paint Enhancement",
      basePrice: 100,
      description: "Choose from multiple paint enhancement options.",
      features: [],
      options: [
        { id: 4.1, name: "Polish & Wax", additionalPrice: 0 },
        { id: 4.2, name: "1-Step Paint Correction", additionalPrice: 50 },
        { id: 4.3, name: "2-Step Paint Correction", additionalPrice: 100 },
      ],
    },
    { id: 5, type: "addon", category: "interior", name: "Pet Hair Removal", basePrice: 20, requiresPackage: undefined },
    { id: 6, type: "addon", category: "interior", name: "Stain Removal", basePrice: 25, requiresPackage: undefined },
    { id: 7, type: "addon", category: "exterior", name: "Clay Bar Treatment", basePrice: 30, requiresPackage: undefined },
    { id: 8, type: "addon", category: "exterior", name: "Tire and Rim Deep Clean", basePrice: 30, requiresPackage: undefined },
    { id: 9, type: "addon", category: "exterior", name: "Headlight Restoration", basePrice: 15, requiresPackage: undefined },
  ];

  const calculatePrice = (basePrice: number, additionalPrice = 0, isAddon = false): number => {
    if (!selectedVehicle) return basePrice + additionalPrice;
    const vehicleFee = vehicles.find((v) => v.type === selectedVehicle)?.addedFee || 0;
    return basePrice + additionalPrice + (isAddon ? 0 : vehicleFee);
  };

  const isAddonIncludedInPackage = (addonName: string): boolean => {
    return selectedPackages.some((id) => {
      const pkg = services.find((service) => service.id === id);
      return pkg?.features?.some((feature) => feature === addonName);
    });
  };

  const isAddonEligible = (addonId: number): boolean => {
    const addon = services.find((service) => service.id === addonId);
    if (addon?.requiresPackage) {
      return selectedPackages.includes(addon.requiresPackage);
    }
    return true;
  };

  useEffect(() => {
    if (!selectedVehicle) {
      setTotal(0);
      return;
    }
  
    const vehicleFee = vehicles.find((v) => v.type === selectedVehicle)?.addedFee || 0;
  
    const packageTotal = selectedPackages.reduce((sum, id) => {
      const pkg = services.find((service) => service.id === id);
      if (pkg?.id === 4 && selectedPolishOption) {
        const option = pkg.options?.find((opt) => opt.id === selectedPolishOption);
        return sum + calculatePrice(pkg.basePrice + vehicleFee, option?.additionalPrice || 0);
      }
      return sum + (pkg?.basePrice || 0) + vehicleFee;
    }, 0);
  
    const addonTotal = selectedAddons.reduce((sum, id) => {
      const addon = services.find((service) => service.id === id);
      return sum + (addon?.basePrice || 0);
    }, 0);
  
    setTotal(packageTotal + addonTotal);
  }, [selectedVehicle, selectedPackages, selectedAddons, selectedPolishOption]);

  useEffect(() => {
    if (!selectedVehicle) return;

    const vehicleFee = vehicles.find((v) => v.type === selectedVehicle)?.addedFee || 0;
    const vehicle = `Vehicle: ${selectedVehicle}`;
    const packages = selectedPackages
      .map((id) => {
        const pkg = services.find((service) => service.id === id);
        if (pkg?.id === 4 && selectedPolishOption) {
          const option = pkg.options?.find((opt) => opt.id === selectedPolishOption);
          return pkg ? `${pkg.name} (${option?.name || ""}) - $${calculatePrice(pkg.basePrice, option?.additionalPrice || 0).toFixed(2)}` : "";
        }
        return pkg ? `${pkg.name} - $${pkg.basePrice + vehicleFee}` : "";
      })
      .join("\n");

    const addons = selectedAddons
      .map((id) => {
        const addon = services.find((service) => service.id === id);
        return addon ? `${addon.name} - $${addon.basePrice}` : "";
      })
      .join("\n");

    const totalText = `Total Price: $${total.toFixed(2)}`;

    setSummaryText(`${vehicle}\n\nPackages:\n${packages}\n\nAdd-ons:\n${addons}\n\n${totalText}`);
  }, [selectedVehicle, selectedPackages, selectedAddons, selectedPolishOption, total]);

  useEffect(() => {
    if (!selectedVehicle) return;

    const vehicleFee = vehicles.find((v) => v.type === selectedVehicle)?.addedFee || 0;
    const vehicle = `Vehicle: ${selectedVehicle}`;
    const packages = selectedPackages
      .map((id) => {
        const pkg = services.find((service) => service.id === id);
        if (pkg?.id === 4 && selectedPolishOption) {
          const option = pkg.options?.find((opt) => opt.id === selectedPolishOption);
          return pkg ? `${pkg.name} (${option?.name || ""}) - $${calculatePrice(pkg.basePrice, option?.additionalPrice || 0).toFixed(2)}` : "";
        }
        return pkg ? `${pkg.name} - $${pkg.basePrice + vehicleFee}` : "";
      })
      .join("\n");

    const addons = selectedAddons
      .map((id) => {
        const addon = services.find((service) => service.id === id);
        return addon ? `${addon.name} - $${addon.basePrice}` : "";
      })
      .join("\n");

    const totalText = `Total Price: $${total.toFixed(2)}`;

    setSummaryText(`${vehicle}\n\nPackages:\n${packages}\n\nAdd-ons:\n${addons}\n\n${totalText}`);
  }, [selectedVehicle, selectedPackages, selectedAddons, selectedPolishOption, total]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(summaryText)
      .then(() => {
        alert("Summary copied to clipboard!");
      })
      .catch((err) => {
        console.error("Clipboard copy failed:", err);
        fallbackCopyText(summaryText);
      });
  };

  const fallbackCopyText = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
      alert("Summary copied to clipboard!");
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textarea);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("https://velvetvault.onrender.com/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsPopupVisible(true);
      } else {
        alert("Failed to send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 0 0, #71086E20 0%, transparent 20%),
            radial-gradient(circle at 100% 0, #71086E20 0%, transparent 20%),
            radial-gradient(circle at 0 100%, #71086E20 0%, transparent 20%),
            radial-gradient(circle at 100% 100%, #71086E20 0%, transparent 20%)
          `,
        }}
      />

      <nav className="bg-white/80 backdrop-blur-lg shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link
              to="/"
              className="flex items-center text-[#71086E] hover:text-[#71086E]/80 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 mr-2" />
              Back to Home
            </Link>
            <div className="text-2xl font-bold text-[#71086E]">
              Select Your Services
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#1E3A8A]">
              Choose Your Vehicle Type
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.type}
                  onClick={() => setSelectedVehicle(vehicle.type)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedVehicle === vehicle.type
                      ? "border-[#71086E] bg-[#71086E]/10"
                      : "border-gray-200 hover:border-[#71086E]/50"
                  }`}
                >
                  <vehicle.icon
                    className={`w-12 h-12 mx-auto mb-4 ${
                      selectedVehicle === vehicle.type
                        ? "text-[#71086E]"
                        : "text-gray-400"
                    }`}
                  />
                  <p className="text-center font-medium">{vehicle.type}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#1E3A8A]">
              Select Your Service Packages
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Every package includes a <strong>Free Basic Exterior Wash</strong>!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services
                .filter((service) => service.type === "package")
                .map((service) => (
                  <div
                    key={service.id}
                    className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                      selectedPackages.includes(service.id)
                        ? "ring-2 ring-[#71086E]"
                        : ""
                    }`}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="text-2xl font-bold text-[#71086E] mb-4">
                        {service.id === 4 && selectedPolishOption
                          ? `$${calculatePrice(
                              service.basePrice,
                              service.options?.find((opt) => opt.id === selectedPolishOption)
                                ?.additionalPrice || 0
                            ).toFixed(2)}`
                          : `$${calculatePrice(service.basePrice).toFixed(2)}`}
                      </div>
                      <ul className="space-y-2 mb-6">
                        {service.features?.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-5 w-5 text-[#71086E] mr-2" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {service.id === 4 ? (
                        <div className="flex flex-col gap-2">
                          {service.options?.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => {
                                setSelectedPackages([service.id]);
                                setSelectedPolishOption(option.id);
                              }}
                              className={`w-full py-3 rounded-lg transition-colors ${
                                selectedPolishOption === option.id
                                  ? "bg-[#71086E] text-white"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                              }`}
                            >
                              {option.name}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            setSelectedPackages((prev) => {
                              if (prev.includes(service.id)) {
                                return prev.filter((id) => id !== service.id);
                              } else {
                                return [...prev, service.id];
                              }
                            })
                          }
                          className={`w-full py-3 rounded-lg transition-colors ${
                            selectedPackages.includes(service.id)
                              ? "bg-[#71086E] text-white"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          {selectedPackages.includes(service.id)
                            ? "Selected"
                            : "Select Package"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>


          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#1E3A8A]">
              Customize with Add-ons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services
                .filter((service) => service.type === "addon")
                .map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => {
                      if (isAddonIncludedInPackage(addon.name)) return;
                      setSelectedAddons((prev) =>
                        prev.includes(addon.id)
                          ? prev.filter((id) => id !== addon.id)
                          : [...prev, addon.id]
                      );
                    }}
                    disabled={isAddonIncludedInPackage(addon.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isAddonIncludedInPackage(addon.name)
                        ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
                        : selectedAddons.includes(addon.id)
                        ? "border-[#71086E] bg-[#71086E]/10"
                        : "border-gray-200 hover:border-[#71086E]/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>
                        {addon.name}
                        {isAddonIncludedInPackage(addon.name) && (
                          <span className="text-sm text-green-600 ml-2">
                            (Included)
                          </span>
                        )}
                      </span>
                      <span className="font-bold">
                        +${addon.basePrice.toFixed(2)}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">
              Your Selection Summary
            </h2>
            <pre className="text-gray-700 bg-gray-100 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
              Send as message in Contact Us.
              <br />
              <br />
              {summaryText}
            </pre>
            <button
              
              onClick={copyToClipboard}
              className="mt-4 w-full bg-[#71086E] text-white py-3 rounded-lg text-lg font-bold hover:bg-[#71086E]/90 transition-colors"
              >
                Copy to Clipboard
              </button>
            </section>
          </div>
          </main>
            <section
              id="contact"
              className="py-24 bg-gradient-to-b from-[#1E3A8A] to-black"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-6">
                      Contact Us
                    </h2>
                    <p className="text-white/90 mb-8">
                      Ready to experience premium auto detailing? Get in touch
                      with us today.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center text-white">
                        <Phone className="h-5 w-5 mr-2" />
                        <span>+1 (915) 232-7873</span>
                      </div>
                      <div className="flex items-center text-white">
                        <Mail className="h-5 w-5 mr-2" />
                        <span>velvetvaultauto@outlook.com</span>
                      </div>
                      <div className="flex items-center text-white">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>El Paso, Texas</span>
                      </div>
                    </div>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address (Optional)"
                      className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (Optional eg:1234567890)"
                      className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                      pattern="[0-9]{10}"
                    />
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows={4}
                      className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-[#71086E] text-white py-3 rounded-lg hover:bg-[#71086E]/80 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                  {isPopupVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fadeIn">
                      <div className="bg-white text-[#1E3A8A] p-6 rounded-xl shadow-xl w-80">
                        <h3 className="text-xl font-semibold mb-3 text-center">
                          Thank You!
                        </h3>
                        <p className="text-sm text-[#4A5568] text-center mb-6">
                          Your message has been received. We’ll get back to you
                          shortly.
                        </p>
                        <button
                          onClick={() => setIsPopupVisible(false)}
                          className="w-full bg-[#71086E] text-white py-2 rounded-lg hover:bg-[#71086E]/90 transition-transform transform hover:scale-105 shadow-md"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          
        
      </div>
    );
  }
  
