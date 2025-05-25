
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function generateAccountNumber(): string {
  // Generate a random 13-digit account number
  return Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
}

export function generateReferenceNumber(): string {
  // Generate a random reference number
  return `REF${Math.floor(Math.random() * 1000000000)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function checkPasswordStrength(password: string): {
  strength: 'weak' | 'medium' | 'strong',
  color: string,
  message: string,
  score: number
} {
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Check for uppercase letters
  if (/[A-Z]/.test(password)) score += 1;
  
  // Check for lowercase letters
  if (/[a-z]/.test(password)) score += 1;
  
  // Check for numbers
  if (/\d/.test(password)) score += 1;
  
  // Check for special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Determine strength based on score
  if (score <= 2) {
    return {
      strength: 'weak',
      color: 'bg-red-500',
      message: 'Weak - Add numbers, symbols, and capital letters',
      score
    };
  } else if (score <= 4) {
    return {
      strength: 'medium',
      color: 'bg-yellow-500',
      message: 'Medium - Add more variety to make it stronger',
      score
    };
  } else {
    return {
      strength: 'strong',
      color: 'bg-green-500',
      message: 'Strong - Good job!',
      score
    };
  }
}
