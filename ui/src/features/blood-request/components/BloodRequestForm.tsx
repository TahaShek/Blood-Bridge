import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  BloodRequest,
  bloodRequestSchema,
  defaultBloodRequest,
} from "../schema";
import { createBloodRequest } from "@/services/bloodRequestApi";
export default function RequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BloodRequest>({
    resolver: zodResolver(bloodRequestSchema),
    defaultValues: defaultBloodRequest,
  });

  const onSubmit = (data: BloodRequest) => {
    setIsSubmitting(true);

    // const payload = {
    //   ...data,
    //   address: {
    //     city: data.city,
    //   },
    // };
    createBloodRequest(data);
    setTimeout(() => {
      console.log("Sending:", payload);
      toast({
        title: "Request sent",
        description: "Your blood request has been submitted.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Is For Self - Full width */}
        <div className="md:col-span-2">
          <Label>Is this request for you?</Label>
          <RadioGroup
            defaultValue={defaultBloodRequest.isForSelf ? "yes" : "no"}
            onValueChange={(value) => setValue("isForSelf", value === "yes")}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Blood Group */}
        <div>
          <Label>Blood Group</Label>
          <Controller
            control={control}
            name="bloodGroup"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.bloodGroup && (
            <p className="text-sm text-red-500">{errors.bloodGroup.message}</p>
          )}
        </div>

        {/* Number of Donors */}
        <div>
          <Label htmlFor="numberOfDonors">Number of Donors Needed</Label>
          <Input
            id="numberOfDonors"
            type="number"
            min={1}
            max={10}
            {...register("numberOfDonors", { valueAsNumber: true })}
          />
          {errors.numberOfDonors && (
            <p className="text-sm text-red-500">
              {errors.numberOfDonors.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register("city")} />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* Hospital */}
        <div>
          <Label htmlFor="hospital">Hospital</Label>
          <Input id="hospital" {...register("hospital")} />
          {errors.hospital && (
            <p className="text-sm text-red-500">{errors.hospital.message}</p>
          )}
        </div>

        {/* Urgency Level */}
        <div>
          <Label>Urgency</Label>
          <Controller
            control={control}
            name="urgencyLevel"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  {["Low", "Medium", "High"].map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.urgencyLevel && (
            <p className="text-sm text-red-500">
              {errors.urgencyLevel.message}
            </p>
          )}
        </div>

        {/* Contact Number - Full width */}
        <div className="md:col-span-2">
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            placeholder="92xxxxxxxxxx"
            {...register("contactNumber")}
          />
          {errors.contactNumber && (
            <p className="text-sm text-red-500">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        {/* Message - Full width */}
        <div className="md:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Any details..."
            {...register("message")}
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button - Full width */}
      <div className="md:col-span-2">
        <Button
          type="submit"
          className="w-full bg-red-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Request..." : "Create Request"}
        </Button>
      </div>
    </form>
  );
}
