"use client";

import SectionHeading from "@/components/section-heading";
import SectionSubHeading from "@/components/section-sub-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { decrypt, encrypt } from "@/lib/crypto";
import { type ComponentProps, useEffect, useState } from "react";

export default function Page() {
  const [passphrase, setPassphrase] = useState("");
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");

  const handleChangePlainText: ComponentProps<typeof Textarea>["onChange"] = (
    e
  ) => {
    const value = e.currentTarget.value;
    setPlainText(value);

    if (!value) {
      setCipherText("");
      return;
    }

    encrypt(value, passphrase).then(setCipherText);
  };

  const handleChangeCipherText: ComponentProps<typeof Textarea>["onChange"] = (
    e
  ) => {
    const value = e.currentTarget.value;
    setCipherText(value);

    if (!value) {
      setPlainText("");
      return;
    }

    decrypt(value, passphrase)
      .then(setPlainText)
      .catch(() => {
        setPlainText("");
      });
  };

  useEffect(() => {
    if (!passphrase) return;
    setPlainText("");
    setCipherText("");
  }, [passphrase]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <SectionHeading>Symmetric Encryption</SectionHeading>
        <SectionSubHeading>
          Simple text encryption & decryption
        </SectionSubHeading>
      </div>
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-4 min-h-56">
        <Textarea
          placeholder="Text"
          onChange={handleChangePlainText}
          value={plainText}
        />
        <Textarea
          placeholder="Data"
          onChange={handleChangeCipherText}
          value={cipherText}
        />
      </div>
      <Input
        type="password"
        placeholder="Passphrase (optional)"
        onChange={(e) => setPassphrase(e.currentTarget.value)}
        value={passphrase}
      />
    </div>
  );
}
