import { Fragment } from "react";
import { filterOptions } from "@/utils/productsUtils";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

const ShoppingFilter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">
          Filters
          <Filter className="inline float-end h-6 w-6" />
        </h2>
      </div>

      <div className="p-4 space-y-4 max-md:flex max-md:justify-between">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={keyItem}>
            <div className={`${index === 0 && "mt-4"}`}>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-3">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex font-medium items-center gap-2 "
                  >
                    <Checkbox
                      checked={filters[keyItem]?.includes(option.id)}
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <hr className="border-slate-200" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ShoppingFilter;
