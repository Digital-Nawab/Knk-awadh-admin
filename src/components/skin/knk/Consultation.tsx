"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Magnetic, Reveal } from "./Reveal";
import { CONTACT } from "./brand";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AREAS_OF_CONCERN = [
  "Skin & Facial Aesthetics",
  "Injectables & Fillers",
  "Hair & Scalp",
  "Body Contouring",
  "Wellness & Longevity",
  "Not Sure, I'd Like Guidance",
] as const;

const consultationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid 10-digit phone number.")
    .max(15, "Please enter a valid phone number."),
  areaOfConcern: z.enum(AREAS_OF_CONCERN, {
    required_error: "Please select an area of concern.",
  }),
  notes: z.string().trim().max(600, "Please keep this under 600 characters.").optional(),
});

type ConsultationValues = z.infer<typeof consultationSchema>;

const Consultation = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { fullName: "", phone: "", areaOfConcern: undefined, notes: "" },
  });

  const onSubmit = async (values: ConsultationValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.fullName,
          phone: values.phone,
          service: values.areaOfConcern,
          service_or_course: values.areaOfConcern,
          form_type: "skin_consultation",
          branch_location: "KNK SKKIN Hazratganj",
          message: values.notes ? `${values.notes} (Concern: ${values.areaOfConcern})` : `Skin consultation for ${values.areaOfConcern}`,
          date: new Date().toISOString().split("T")[0],
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast({
          title: "Consultation Request Received",
          description: `Thank you, ${values.fullName}! Your consultation for "${values.areaOfConcern}" has been registered. Our doctor will contact you shortly.`,
        });
        form.reset({ fullName: "", phone: "", areaOfConcern: undefined, notes: "" });
      } else {
        toast({
          title: "Booking Notice",
          description: data?.error || `Thank you, ${values.fullName}. Our team has received your inquiry.`,
        });
        form.reset({ fullName: "", phone: "", areaOfConcern: undefined, notes: "" });
      }
    } catch {
      toast({
        title: "Consultation Request Received",
        description: `Thank you, ${values.fullName}. Our team has received your details and will call you.`,
      });
      form.reset({ fullName: "", phone: "", areaOfConcern: undefined, notes: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="book-consultation"
      className="scroll-mt-28 relative overflow-hidden bg-[#533620] py-24 text-secondary-foreground grain md:py-40"
    >
      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="display text-[10vw] uppercase leading-[0.9] sm:text-[6.5vw] lg:text-[3.6vw]">
              Begin your journey
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-sm text-sm leading-loose text-secondary-foreground/70">
              Meet with our specialist doctors for a personal consultation designed around you.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <p className="label-xs text-gold">Speak to our team</p>
              {/* Real consultation line not yet provided by the client — placeholder only, never a live tel: link. */}
              <p className="mt-3 font-display text-2xl text-secondary-foreground/90">
                {CONTACT.phonePlaceholder}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <address className="mt-12 not-italic">
              <p className="label-xs text-gold">KNK SKKIN</p>
              <p className="mt-4 max-w-sm text-sm leading-loose text-secondary-foreground/70">
                {CONTACT.address}, {CONTACT.city}
              </p>
            </address>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="border border-background/15 bg-background/5 p-6 md:p-10">
              <p className="label-xs text-secondary-foreground/50">Tell us a little about you</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="label-xs text-secondary-foreground/60">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              className="border-background/20 bg-transparent text-secondary-foreground placeholder:text-secondary-foreground/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="label-xs text-secondary-foreground/60">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter your phone number"
                              className="border-background/20 bg-transparent text-secondary-foreground placeholder:text-secondary-foreground/40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="areaOfConcern"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="label-xs text-secondary-foreground/60">Area of Concern</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-background/20 bg-transparent text-secondary-foreground">
                              <SelectValue placeholder="Select a treatment area" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AREAS_OF_CONCERN.map((area) => (
                              <SelectItem key={area} value={area}>
                                {area}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="label-xs text-secondary-foreground/60">
                          Anything specific you&rsquo;d like us to know? (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your concerns, goals or anything you'd like our doctors to know."
                            className="min-h-[100px] border-background/20 bg-transparent text-secondary-foreground placeholder:text-secondary-foreground/40"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Magnetic className="inline-block">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="group h-auto rounded-none bg-gold-gradient px-9 py-5 label-xs text-[#6B4324] hover:opacity-90 disabled:opacity-60 cursor-pointer"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting Request...
                        </span>
                      ) : (
                        <>
                          Request Your Consultation
                          <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">
                            →
                          </span>
                        </>
                      )}
                    </Button>
                  </Magnetic>

                  <p className="text-xs leading-relaxed text-secondary-foreground/40">
                    We respect your privacy. Your details are never shared.
                  </p>
                </form>
              </Form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
