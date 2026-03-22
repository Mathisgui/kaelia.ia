"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import { ANIMATION } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  company: z.string().optional(),
  email: z.string().email("Email invalide"),
  message: z.string().min(1, "Le message est requis"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Validate with zod
    const result = contactSchema.safeParse(data);
    if (!result.success) return;

    console.log("Form submitted:", result.data);
    setSubmitted(true);
    reset();
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".contact-animate"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION.fadeInDuration,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-white/30 outline-none transition-colors duration-200 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]/30";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-40 md:py-56"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="contact-animate mb-6 text-center text-sm font-medium uppercase tracking-wider text-[#7c3aed]">
          {content.contact.sectionTitle}
        </h2>
        <p className="contact-animate mx-auto mb-16 max-w-2xl text-center text-white/60 leading-relaxed">
          {content.contact.description}
        </p>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: description + contact info */}
          <div className="contact-animate flex flex-col justify-center">
            <p className="mb-10 text-lg leading-relaxed text-white/60">
              {content.contact.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                  href="mailto:contact@mathis-ia.fr"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  contact@mathis-ia.fr
                </a>
              </div>

              <div className="flex items-center gap-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                <a
                  href="tel:+33600000000"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  +33 6 00 00 00 00
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-animate rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-4"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-lg text-white">
                  {content.contact.form.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <input
                    {...register("name", { required: "Le nom est requis" })}
                    placeholder={content.contact.form.name}
                    className={inputClasses}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register("company")}
                    placeholder={content.contact.form.company}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <input
                    {...register("email", {
                      required: "L'email est requis",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email invalide",
                      },
                    })}
                    type="email"
                    placeholder={content.contact.form.email}
                    className={inputClasses}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    {...register("message", {
                      required: "Le message est requis",
                    })}
                    placeholder={content.contact.form.message}
                    rows={5}
                    className={`${inputClasses} resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-[#7c3aed] bg-transparent px-8 py-4 font-semibold text-[#7c3aed] transition-all duration-300 hover:bg-[#7c3aed]/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] disabled:opacity-50"
                >
                  {isSubmitting ? "..." : content.contact.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
