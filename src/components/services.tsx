import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Car,
  Truck,
  CircleDollarSign,
} from "lucide-react";

export default function ServicesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);

  const vehicles = [
    {
      type: "Coupe",
      multiplier: 1.0,
      icon: Car,
    },
    {
      type: "Sedan",
      multiplier: 1.2,
      icon: Car,
    },
    {
      type: "Small Truck",
      multiplier: 1.3,
      icon: Truck,
    },
    {
      type: "Big Truck",
      multiplier: 1.5,
      icon: Truck,
    },
    {
      type: "SUV",
      multiplier: 1.6,
      icon: Car,
    },
  ];

  const services = [
    {
      id: 1,
      name: "Maintenance Interior Deep Clean",
      basePrice: 50,
      description: "A routine interior cleaning to keep your car fresh.",
      features: [
        "Carpet and Seat Shampoo",
        "Minimal Stain Removal",
        "Full Console and Dashboard Wipe Down",
        "Vacuuming",
      ],
    },
    {
      id: 2,
      name: "Extreme Interior Deep Clean",
      basePrice: 120,
      description: "A comprehensive interior overhaul for a like-new feel.",
      features: [
        "Carpet and Seat Shampoo and Extraction",
        "Full Dashboard and Console Deep Clean",
        "Leather Conditioning",
        "Stain Removal",
        "Vacuuming",
      ],
    },
    {
      id: 3,
      name: "Full Exterior Extreme Deep Clean",
      basePrice: 150,
      description:
        "A top-to-bottom exterior transformation for your vehicle.",
      features: [
        "Polish and Wax",
        "Tire and Rim Deep Clean",
        "Clay Bar Treatment",
        "Engine Bay Cleaning",
        "Headlight Restoration",
      ],
    },
  ];

  useEffect(() => {
    if (selectedVehicle && selectedServices.length > 0) {
      const multiplier =
        vehicles.find((v) => v.type === selectedVehicle)?.multiplier || 1;
      const baseTotal = selectedServices.reduce((sum, service) => {
        const pkg = services.find((s) => s.id === service);
        return sum + (pkg?.basePrice || 0);
      }, 0);
      setTotal(baseTotal * multiplier);
    } else {
      setTotal(0);
    }
  }, [selectedVehicle, selectedServices]);

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
          {/* Vehicle Selection */}
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

          {/* Services Selection */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#1E3A8A]">
              Select Your Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                    selectedServices.includes(service.id)
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
                      ${service.basePrice}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-[#71086E] mr-2" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() =>
                        setSelectedServices((prev) =>
                          prev.includes(service.id)
                            ? prev.filter((id) => id !== service.id)
                            : [...prev, service.id]
                        )
                      }
                      className={`w-full py-3 rounded-lg transition-colors ${
                        selectedServices.includes(service.id)
                          ? "bg-[#71086E] text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {selectedServices.includes(service.id)
                        ? "Selected"
                        : "Select Service"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Total Price Section */}
          <section className="bg-[#71086E]/10 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center">
              <CircleDollarSign className="h-12 w-12 text-[#71086E] mb-4" />
              <h2 className="text-2xl font-bold text-[#71086E] mb-2">
                Total Price
              </h2>
              <p className="text-4xl font-bold mb-4">${total.toFixed(2)}</p>
              {selectedVehicle && (
                <p className="text-gray-600">
                  Price adjusted for {selectedVehicle} (
                  {vehicles.find((v) => v.type === selectedVehicle)?.multiplier ||
                    1}
                  x multiplier)
                </p>
              )}
              <p className="text-[#71086E] mt-4">
                * Free exterior wash included with all services
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}







