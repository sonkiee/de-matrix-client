import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Filter as FilterIcon } from "lucide-react";
import { useParams } from "next/navigation";
import FilterContent from "./filter-content";
import FilterMobile from "./filter-mobile";

export default function Filter(props: { filter; setFilter }) {
  const params = useParams();
  const slug = params.category as string;
  console.log("Filter slug:", slug);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="font-semibold">Filters</h2>
        <FilterMobile slug={slug} />
      </div>

      <div className="hidden lg:block">
        <FilterContent {...props} slug={slug} />
      </div>
    </div>
  );
}
