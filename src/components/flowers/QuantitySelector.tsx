"use client";

interface QuantitySelectorProps {
  quantity: number;
  unit: string;
  min?: number;
  max?: number;
  onChange: (quantity: number) => void;
}

export default function QuantitySelector({
  quantity,
  unit,
  min = 1,
  max = 200,
  onChange,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-saffron-300 rounded-full bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= min}
          aria-label="Decrease quantity"
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-saffron-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors text-base font-bold"
        >
          −
        </button>
        <span className="w-12 text-center font-bold text-gray-800 text-sm">
          {quantity}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= max}
          aria-label="Increase quantity"
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-saffron-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors text-base font-bold"
        >
          +
        </button>
      </div>
      <span className="text-sm font-medium text-gray-500 capitalize">
        {unit}
      </span>
    </div>
  );
}
