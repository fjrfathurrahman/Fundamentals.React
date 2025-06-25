import {
  Heart,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

const productImages = [
  "/placeholder.svg?height=500&width=500",
  "/placeholder.svg?height=500&width=500",
  "/placeholder.svg?height=500&width=500",
  "/placeholder.svg?height=500&width=500",
];

export function ProductDetail() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto p-6">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square relative overflow-hidden rounded-lg border">
          <img
            src={productImages[0] || "/placeholder.svg"}
            alt="Product main image"
            className="object-cover"
          />
          <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {productImages.map((image, index) => (
            <button
              key={index}
              className="aspect-square relative overflow-hidden rounded-md border hover:border-primary transition-colors"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Product image ${index + 1}`}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="text-sm text-muted-foreground mb-2">Electronics</div>
          <h1 className="text-3xl font-bold mb-4">
            Premium Wireless Bluetooth Headphones
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < 4
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              (4.5) • 128 reviews
            </span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold">$79.99</span>
            <span className="text-xl text-muted-foreground line-through">
              $99.99
            </span>
            <Badge variant="destructive">20% OFF</Badge>
          </div>
        </div>

        <Separator />

        {/* Product Options */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="color" className="text-base font-medium">
              Color
            </Label>
            <Select defaultValue="black">
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Matte Black</SelectItem>
                <SelectItem value="white">Pearl White</SelectItem>
                <SelectItem value="blue">Ocean Blue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quantity" className="text-base font-medium">
              Quantity
            </Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="flex-1">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          <Button size="lg" variant="outline">
            <Heart className="h-5 w-5 mr-2" />
            Add to Wishlist
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Truck className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium text-sm">Free Shipping</div>
                <div className="text-xs text-muted-foreground">
                  On orders over $50
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium text-sm">2 Year Warranty</div>
                <div className="text-xs text-muted-foreground">
                  Full coverage
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <RotateCcw className="h-5 w-5 text-orange-600" />
              <div>
                <div className="font-medium text-sm">30-Day Returns</div>
                <div className="text-xs text-muted-foreground">
                  No questions asked
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="prose prose-sm max-w-none">
              <p>
                Experience premium audio quality with these wireless Bluetooth
                headphones. Featuring advanced noise cancellation technology and
                up to 30 hours of battery life, these headphones are perfect for
                music lovers and professionals alike.
              </p>
              <ul className="list-disc list-inside space-y-1 mt-4">
                <li>Active Noise Cancellation (ANC)</li>
                <li>30-hour battery life with quick charge</li>
                <li>Premium leather ear cushions</li>
                <li>Bluetooth 5.0 connectivity</li>
                <li>Built-in microphone for calls</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Driver Size</div>
                <div className="text-muted-foreground">40mm</div>
              </div>
              <div>
                <div className="font-medium">Frequency Response</div>
                <div className="text-muted-foreground">20Hz - 20kHz</div>
              </div>
              <div>
                <div className="font-medium">Battery Life</div>
                <div className="text-muted-foreground">30 hours</div>
              </div>
              <div>
                <div className="font-medium">Weight</div>
                <div className="text-muted-foreground">250g</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="font-medium">John D.</span>
                <span className="text-sm text-muted-foreground">
                  Verified Purchase
                </span>
              </div>
              <p className="text-sm">
                Excellent sound quality and comfortable to wear for long
                periods. The noise cancellation works great on flights.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
