import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export type Option = {
    label: string
    value: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChange: (selected: string[]) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select options...",
    className,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter((item) => item !== value))
        } else {
            onChange([...selected, value])
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between h-auto min-h-10", className)}
                >
                    <div className="flex flex-wrap gap-1 text-left">
                        {selected.length > 0 ? (
                            selected.map((item) => (
                                <Badge variant="secondary" key={item} className="mr-1">
                                    {options.find((option) => option.value === item)?.label || item}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2" align="start">
                <div className="flex flex-col max-h-64 overflow-y-auto">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={cn(
                                "flex items-center gap-2 p-2 rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors",
                                selected.includes(option.value) ? "bg-accent/50" : ""
                            )}
                            onClick={() => handleSelect(option.value)}
                        >
                            <div className={cn(
                                "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                selected.includes(option.value) ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                            )}>
                                <Check className={cn("h-3 w-3")} />
                            </div>
                            <span className="text-sm">{option.label}</span>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
