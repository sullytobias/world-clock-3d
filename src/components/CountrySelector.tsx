import { FC } from "react";

import { timezoneCities } from "../utils/timezoneCities";

type CountrySelectorProps = {
    onSelectCountry: (timezone: string) => void;
};

const CountrySelector: FC<CountrySelectorProps> = ({ onSelectCountry }) => {
    return (
        <select onChange={(e) => onSelectCountry(e.target.value)}>
            {timezoneCities.map((country, index) => (
                <option key={country.timezone + index} value={country.timezone}>
                    {country.city}
                </option>
            ))}
        </select>
    );
};

export default CountrySelector;