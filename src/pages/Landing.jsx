
import { useState } from "react";
import { ArrowRight, Search, Filter, Calendar, Youtube, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Landing = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = [
    {
      icon: Search,
      title: "Smart Video Search",
      description: "Search through any YouTube channel's entire video library with advanced filtering options."
    },
    {
      icon: Filter,
      title: "Advanced Filtering",
      description: "Filter videos by date range, keywords, and other criteria to find exactly what you need."
    },
    {
      icon: Calendar,
      title: "Date Range Selection",
      description: "Browse videos from specific time periods with our intuitive date picker interface."
    },
    {
      icon: Youtube,
      title: "Channel Analytics",
      description: "Get insights into channel statistics and video performance metrics."
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Find Channel ID",
      description: "Go to any YouTube channel and copy the Channel ID from the URL or About section"
    },
    {
      step: "2", 
      title: "Enter Channel ID",
      description: "Paste the Channel ID into our search box and click the search button"
    },
    {
      step: "3",
      title: "Browse & Filter",
      description: "Use our advanced filters to find specific videos from the channel's library"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="outline" className="mb-6">
            🚀 Discover YouTube Content Like Never Before
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Browse YouTube
            <span className="text-primary block">Channels Smarter</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Filter and explore any YouTube channel's video library with powerful search tools, 
            date filtering, and advanced analytics. Find exactly what you're looking for in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="px-8 py-3 text-lg">
              <Link to="/browse">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                  <Play className="mr-2 h-5 w-5" /> Watch Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Youtube className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Demo Video Coming Soon</h3>
                    <p className="text-muted-foreground">
                      We're preparing an amazing demo video to show you all the features!
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Content Discovery
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to explore and analyze YouTube channels efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How to Find a YouTube Channel ID
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to get started with any YouTube channel
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Channel ID Demo Card */}
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Finding Channel ID - Visual Guide</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Method 1: From Channel URL</h4>
                    <p className="text-muted-foreground mb-2">
                      Look for the Channel ID in the URL after "/channel/"
                    </p>
                    <code className="bg-muted px-3 py-1 rounded text-sm">
                      youtube.com/channel/<span className="text-primary font-semibold">UCuAXFkgsw1L7xaCfnd5JJOw</span>
                    </code>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Method 2: From About Page</h4>
                    <p className="text-muted-foreground mb-2">
                      Go to the channel's About tab and copy the Channel ID from the details section
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Method 3: View Page Source</h4>
                    <p className="text-muted-foreground">
                      Right-click on the channel page, select "View Page Source" and search for "channelId"
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Explore YouTube Channels?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start discovering and filtering videos from any YouTube channel today
          </p>
          <Button asChild size="lg" variant="secondary" className="px-8 py-3 text-lg">
            <Link to="/browse">
              Start Browsing Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
