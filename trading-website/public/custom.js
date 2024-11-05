import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, StarHalf, Quote } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TradingWebsite = () => {
  const [visibleStats, setVisibleStats] = useState([]);
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [showPurchaseError, setShowPurchaseError] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCoaching, setSelectedCoaching] = useState(null);

  const stats = [
    { label: 'Win Rate', value: '38.1%', color: 'text-green-600' },
    { label: 'Break-even Rate', value: '37.1%', color: 'text-yellow-600' },
    { label: 'Loss Rate', value: '24.7%', color: 'text-red-600' },
  ];

  const coachingOptions = [
    { months: 1, price: 49.99, discount: 0 },
    { months: 2, price: 89.98, discount: 10 },
    { months: 3, price: 104.97, discount: 30 },
  ];

  const features = [
    {
      title: 'Systematic Approach',
      description: 'Clear entry and exit rules',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      title: 'Risk Management',
      description: 'Protected capital growth',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'Regular Updates',
      description: 'Ongoing strategy refinement',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ];

  const [reviews, setReviews] = useState([
    {
      id: 1,
      text: "The systematic approach really helped me develop discipline in my trading. The risk management rules are clear and effective.",
      rating: 5,
      author: "Michael",
      purchaseDate: "2024-01-15",
    },
    {
      id: 2,
      text: "Good strategy overall, took some time to adapt but seeing consistent results now. Would appreciate more advanced setups.",
      rating: 4,
      author: "James",
      purchaseDate: "2024-02-01",
    },
    {
      id: 3,
      text: "Very practical approach to trading. The coaching sessions were particularly valuable for understanding market psychology.",
      rating: 4.5,
      author: "David",
      purchaseDate: "2024-02-15",
    },
  ]);

  useEffect(() => {
    stats.forEach((_, index) => {
      setTimeout(() => {
        setVisibleStats((prev) => [...prev, index]);
      }, 1000 * (index + 1));
    });

    features.forEach((_, index) => {
      setTimeout(() => {
        setVisibleFeatures((prev) => [...prev, index]);
      }, 500 * (index + 1));
    });

    const reviewInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
        setIsAnimating(false);
      }, 500);
    }, 10000);

    return () => clearInterval(reviewInterval);
  }, [reviews.length]);

  const handleStrategyPurchase = () => {
    const baseUrl = "https://www.paypal.com/cgi-bin/webscr";
    const params = new URLSearchParams({
      cmd: "_xclick",
      business: "Kayhuybreghs@icloud.com",
      item_name: "Trading Strategy",
      amount: "250.00",
      currency_code: "EUR",
      return: window.location.href,
      cancel_return: window.location.href,
    });
    window.location.href = `${baseUrl}?${params.toString()}`;
    setHasPurchased(true);
    setPurchaseDate(new Date().toISOString().split('T')[0]);
  };

  const handleCoachingPurchase = () => {
    if (!selectedCoaching) return;

    const option = coachingOptions[parseInt(selectedCoaching) - 1];
    const baseUrl = "https://www.paypal.com/cgi-bin/webscr";
    const params = new URLSearchParams({
      cmd: "_xclick-subscriptions",
      business: "Kayhuybreghs@icloud.com",
      item_name: `${option.months} Month(s) Trading Coaching`,
      a3: option.price.toFixed(2),
      p3: option.months,
      t3: "M",
      src: "1",
      currency_code: "EUR",
      return: window.location.href,
      cancel_return: window.location.href,
    });
    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  const verifyPurchaseAndOpenDialog = () => {
    if (!hasPurchased) {
      setShowPurchaseError(true);
      setTimeout(() => setShowPurchaseError(false), 3000);
      return;
    }

    const purchaseTime = new Date(purchaseDate).getTime();
    const currentTime = new Date().getTime();
    const hoursSincePurchase = (currentTime - purchaseTime) / (1000 * 60 * 60);

    if (hoursSincePurchase < 24) {
      alert("Please wait 24 hours after purchase before leaving a review.");
      return;
    }

    setIsReviewDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (newReview.trim() && selectedRating > 0) {
      const newReviewObject = {
        id: reviews.length + 1,
        text: newReview.trim(),
        rating: selectedRating,
        author: "John",
        purchaseDate: purchaseDate,
      };

      setReviews((prev) => [...prev, newReviewObject]);
      setNewReview('');
      setSelectedRating(0);
      setIsReviewDialogOpen(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    return stars;
  };

  return (
    <div>
      {/* Your component JSX goes here */}
    </div>
  );
};

export default TradingWebsite;
