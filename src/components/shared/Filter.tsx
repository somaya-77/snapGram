import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"


const Filter = () => {
    return (
        <Select>
            <SelectTrigger className=" bg-dark-3 rounded-xl px-4 py-2 w-fit">
                <div className="flex-center gap-3">
                    <SelectValue placeholder="All" />
                    {/* <img
                        src="/assets/icons/filter.svg"
                        width={20}
                        height={20}
                        alt="filter"
                    /> */}
                </div>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="art and cultural">Art and cultural</SelectItem>
            </SelectContent>
        </Select>

    )
}

export default Filter
