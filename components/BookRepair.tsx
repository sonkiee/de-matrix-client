import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function BookRepair() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Book a Repair Online
          </h2>
          <p className="text-center mb-8 text-gray-600">
            Fill out the form below and we&apos;ll get back to you within 2
            hours to confirm your appointment.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">
                  Phone
                </label>
                <Input id="phone" placeholder="Your phone number" />
              </div>
            </div>
            <div>
              <label htmlFor="issue" className="block mb-2 font-medium">
                Issue Description
              </label>
              <Textarea
                id="issue"
                placeholder="Describe the issue with your device"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block mb-2 font-medium">
                  Preferred Date
                </label>
                <Input id="date" type="date" />
              </div>
              <div>
                <label htmlFor="time" className="block mb-2 font-medium">
                  Preferred Time
                </label>
                <Input id="time" type="time" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Book Appointment
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
