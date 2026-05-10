"use client";

import React from "react";
import type { SiteContent } from "@/i18n/translations";
import { EditField, EditArea, EditBlock } from "@/components/admin/EditHelpers";
import SchoolLogo from "@/components/SchoolLogo";

interface HeroSectionProps {
  isAdmin: boolean;
  de: SiteContent;
  zh: SiteContent;
  en: SiteContent;
  showEn: (section: string) => boolean;
  setDraftDe: React.Dispatch<React.SetStateAction<SiteContent>>;
  setDraftZh: React.Dispatch<React.SetStateAction<SiteContent>>;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  updDe: <K extends keyof SiteContent>(section: K, patch: Partial<SiteContent[K]> & object) => void;
  updZh: <K extends keyof SiteContent>(section: K, patch: Partial<SiteContent[K]> & object) => void;
}

export default function HeroSection({
  isAdmin,
  de,
  zh,
  en,
  showEn,
  setDraftDe,
  setDraftZh,
  setIsDirty,
  updDe,
  updZh,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      data-testid="section-home"
      className="relative overflow-hidden bg-school-dark text-white py-16 px-4 md:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 w-96 h-96 rounded-full border-4 border-white/5 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full border-2 border-white/5 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        {/* Top: Logo centered */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="w-32 sm:w-40 md:w-48">
            <SchoolLogo responsive={true} />
          </div>
        </div>

        {/* Content: Text centered */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {isAdmin ? (
            <EditBlock label="School Name" className="p-3 space-y-2 bg-school-dark mb-3">
              <div>
                <label className="text-xs text-amber-300 font-semibold block mb-1">DE School Name</label>
                <EditField
                  value={de.schoolName}
                  onChange={(v) => { setDraftDe((d) => ({ ...d, schoolName: v })); setIsDirty(true); }}
                  className="text-school-red font-semibold tracking-widest uppercase text-sm w-full"
                  placeholder="School name (DE)…"
                />
              </div>
              <div>
                <label className="text-xs text-amber-300 font-semibold block mb-1">ZH School Name</label>
                <EditField
                  value={zh.schoolName}
                  onChange={(v) => { setDraftZh((d) => ({ ...d, schoolName: v })); setIsDirty(true); }}
                  className="font-cn text-5xl sm:text-6xl md:text-7xl font-bold text-white w-full"
                  placeholder="学校名称（中文）…"
                />
              </div>
            </EditBlock>
          ) : (
            <>
              {de.schoolName.trim() && (
                <p className="text-school-red font-semibold tracking-widest uppercase text-sm mb-4">
                  {de.schoolName}
                </p>
              )}
              <h1 className="font-cn text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4">
                {zh.schoolName}
              </h1>
              {showEn("hero") && en.schoolName.trim() && (
                <p className="text-gray-400 text-sm mb-6">
                  {en.schoolName}
                </p>
              )}
            </>
          )}

          {isAdmin ? (
            <EditBlock label="Hero Text" className="p-4 space-y-3 bg-school-dark">
              <div>
                <label className="text-xs text-amber-300 font-semibold block mb-1">DE Tagline</label>
                <EditArea
                  value={de.hero.tagline}
                  onChange={(v) => updDe("hero", { tagline: v })}
                  className="text-gray-300 text-lg"
                  placeholder="German tagline…"
                />
              </div>
              <div>
                <label className="text-xs text-amber-300 font-semibold block mb-1">ZH Tagline</label>
                <EditArea
                  value={zh.hero.tagline}
                  onChange={(v) => updZh("hero", { tagline: v })}
                  className="font-cn text-gray-400 text-base"
                  placeholder="Chinese tagline…"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-amber-300 font-semibold block mb-1">DE Button: Discover Courses</label>
                  <EditField
                    value={de.hero.discoverCourses}
                    onChange={(v) => updDe("hero", { discoverCourses: v })}
                    className="text-white text-sm font-semibold w-full"
                    placeholder="Button text…"
                  />
                </div>
                <div>
                  <label className="text-xs text-amber-300 font-semibold block mb-1">ZH Button: 查看课程</label>
                  <EditField
                    value={zh.hero.discoverCourses}
                    onChange={(v) => updZh("hero", { discoverCourses: v })}
                    className="font-cn text-white text-sm font-semibold w-full"
                    placeholder="按钮文字…"
                  />
                </div>
                <div>
                  <label className="text-xs text-amber-300 font-semibold block mb-1">DE Button: Contact Us</label>
                  <EditField
                    value={de.hero.contactUs}
                    onChange={(v) => updDe("hero", { contactUs: v })}
                    className="text-white text-sm font-semibold w-full"
                    placeholder="Button text…"
                  />
                </div>
                <div>
                  <label className="text-xs text-amber-300 font-semibold block mb-1">ZH Button: 联系我们</label>
                  <EditField
                    value={zh.hero.contactUs}
                    onChange={(v) => updZh("hero", { contactUs: v })}
                    className="font-cn text-white text-sm font-semibold w-full"
                    placeholder="按钮文字…"
                  />
                </div>
              </div>
            </EditBlock>
          ) : (
            <>
              <p className="font-cn text-lg sm:text-xl md:text-2xl text-gray-300 mb-3">
                {zh.hero.tagline}
              </p>
              {de.hero.tagline.trim() && (
                <p className="text-gray-400 text-sm md:text-base mb-2">
                  {de.hero.tagline}
                </p>
              )}
              {showEn("hero") && en.hero.tagline.trim() && (
                <p className="text-gray-500 text-xs md:text-sm mb-8">
                  {en.hero.tagline}
                </p>
              )}
            </>
          )}
        </div>

        {/* Buttons: Centered */}
        {!isAdmin && (
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a
              href="#courses"
              data-testid="hero-discover-courses-link"
              className="px-6 py-3 bg-school-red hover:bg-school-red-dark text-white font-semibold rounded transition-colors text-sm md:text-base"
            >
              <span className="font-cn">{zh.hero.discoverCourses}</span>
              {de.hero.discoverCourses.trim() && (<><span className="mx-1 opacity-70">·</span>{de.hero.discoverCourses}</>)}
              {showEn("hero") && en.hero.discoverCourses.trim() && (<><span className="mx-1 opacity-70">·</span>{en.hero.discoverCourses}</>)}
            </a>
            <a
              href="#contact"
              data-testid="hero-contact-link"
              className="px-6 py-3 border border-white/30 hover:border-white text-white font-semibold rounded transition-colors text-sm md:text-base"
            >
              <span className="font-cn">{zh.hero.contactUs}</span>
              {de.hero.contactUs.trim() && (<><span className="mx-1 opacity-70">·</span>{de.hero.contactUs}</>)}
              {showEn("hero") && en.hero.contactUs.trim() && (<><span className="mx-1 opacity-70">·</span>{en.hero.contactUs}</>)}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
