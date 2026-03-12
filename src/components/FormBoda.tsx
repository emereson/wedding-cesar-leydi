import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

type FormData = {
  name: string;
  phone: string;
  email: string;
  // guests: number;
};

function WeddingForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (loading) return;
    setLoading(true);

    try {
      await emailjs.send(
        "service_ksgjnvk", // SERVICE ID
        "template_sjet75m", // TEMPLATE ID
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
        },
        "RpTKmqKcvysdeeL7b", // PUBLIC KEY
      );

      toast.success("Thank you for confirming your attendance!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" w-screen h-screen flex overflow-hidden max-lg:flex-col-reverse max-sm:h-auto z-10">
      <div className="animation-scroll bg-[#45524c] h-auto z-10 w-1/2 flex items-center justify-center p-14 max-lg:h-auto max-lg:w-full max-lg:px-4">
        <article className="animate-on-scroll font-[freeFa900] w-full max-w-xl bg-[url(/img/hoja.webp)] bg-fixed bg-cover bg-no-repeat bg-center px-6 py-10 text-center text-[#8f8269] max-lg:-mt-25">
          <h2 className="text-3xl mb-6 font-bold">Confirm Your Attendance</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            {/* Name */}
            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                {...register("name", { required: true })}
                placeholder="Your name"
                className="border border-gray-300 p-2 rounded-lg w-full"
                disabled={loading}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required</span>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-1 font-semibold">
                Phone Number 📞
              </label>
              <input
                {...register("phone", { required: true, pattern: /^[0-9]+$/ })}
                placeholder="Your phone number"
                className="border border-gray-300 p-2 rounded-lg w-full"
                disabled={loading}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  Enter a valid phone number
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Your email"
                className="border border-gray-300 p-2 rounded-lg w-full"
                disabled={loading}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-[#8f8269] text-white hover:bg-[#9a7b55] flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                ) : null}
                {loading ? "Sending..." : "Confirm"}
              </button>
            </div>
          </form>
        </article>
      </div>

      {/* Image */}
      <img
        className="w-1/2 h-full object-cover max-lg:w-full max-lg:h-[50vh] z-10"
        src="/img/12.webp"
        alt="wedding"
      />
    </section>
  );
}

export default memo(WeddingForm);
