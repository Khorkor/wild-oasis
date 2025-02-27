import { FC } from "react";

import { getCountries } from "@/app/_lib/data-service";

import { ICountry } from "../_types";

interface SelectCountryProps {
  defaultCountry: string;
  name: string;
  id: string;
  className?: string;
}

const SelectCountry: FC<SelectCountryProps> = async ({
  defaultCountry,
  name,
  id,
  className,
}) => {
  const countries: ICountry[] = await getCountries();

  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;
