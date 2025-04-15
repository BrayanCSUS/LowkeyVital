"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Info, MapPin, ZoomIn, ZoomOut } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function RoomMap() {
  const [zoom, setZoom] = useState(1)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Campus Map</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.1))} disabled={zoom >= 2}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="all">All Buildings</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="admin">Administrative</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative border rounded-lg overflow-hidden" style={{ height: "500px" }}>
        <div
          className="relative w-full h-full bg-gray-100 overflow-auto"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        >
          {/* This would be replaced with an actual interactive map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[800px] h-[600px]">
              {/* Placeholder for campus map */}
              <div className="absolute w-full h-full bg-[#f0f0f0] flex items-center justify-center">
                <span className="text-gray-400">Campus Map</span>
              </div>

              {/* Building markers */}
              <TooltipProvider>
                {/* Library */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-[200px] left-[300px] bg-[#00563F] text-white hover:bg-[#00563F]/90 hover:text-white"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-medium">University Library</p>
                      <p className="text-xs text-muted-foreground">12 rooms available</p>
                      <Badge className="bg-green-500">Open Now</Badge>
                    </div>
                  </TooltipContent>
                </Tooltip>

                {/* Science Building */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-[250px] left-[450px] bg-[#00563F] text-white hover:bg-[#00563F]/90 hover:text-white"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-medium">Science Building</p>
                      <p className="text-xs text-muted-foreground">8 rooms available</p>
                      <Badge className="bg-green-500">Open Now</Badge>
                    </div>
                  </TooltipContent>
                </Tooltip>

                {/* Student Union */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-[350px] left-[350px] bg-[#00563F] text-white hover:bg-[#00563F]/90 hover:text-white"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-medium">University Union</p>
                      <p className="text-xs text-muted-foreground">5 rooms available</p>
                      <Badge className="bg-green-500">Open Now</Badge>
                    </div>
                  </TooltipContent>
                </Tooltip>

                {/* Your current location */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-[300px] left-[380px] bg-[#C4B581] text-[#00563F] hover:bg-[#C4B581]/90 hover:text-[#00563F] animate-pulse"
                    >
                      <MapPin className="h-4 w-4 fill-current" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">Your Current Location</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <Button variant="secondary" size="sm" className="h-8">
            <Info className="mr-2 h-4 w-4" />
            Legend
          </Button>
          <Button className="h-8 bg-[#00563F] hover:bg-[#00563F]/90">
            <MapPin className="mr-2 h-4 w-4" />
            Find Nearest Room
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing all buildings on campus</p>
        <p>Last updated: Just now</p>
      </div>
    </div>
  )
}
