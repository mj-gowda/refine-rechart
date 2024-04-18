import { cn } from "@/lib/utils"

import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/ui/popover"
import { Button } from "../shadcn/ui/button"
import { Calendar } from "../shadcn/ui/calendar"



export const LegendCalendar = ({ ...props }) => {
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        size="sm"
                        className={cn(
                            " max-w-[140px] align-middle justify-start text-left font-normal",
                            !props.date && "text-muted-foreground"
                        )}
                    >
                        {props.date ? format(props.date, "PPP") : format(new Date(2022, props.defaultMonth), "PPP")}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto bg-slate-50 p-2" side="bottom" align="start">
                    <Calendar
                        mode="single"
                        selected={props.date ? props.date : new Date(2022, props.defaultMonth)}
                        defaultMonth={props.date ? props.date : new Date(2022, props.defaultMonth)}
                        initialFocus
                        fromYear={Number(props.years[props.years.length - 1])}
                        toYear={Number(props.years[props.years.length - 1])}
                        disableNavigation={props.navigation ? props.navigation : false}
                        captionLayout="dropdown-buttons"
                        onMonthChange={props.setDate}
                    />
                </PopoverContent>
            </Popover>
        </>
    )
}