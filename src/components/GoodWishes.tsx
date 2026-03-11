import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { API } from "../utils/api";

type FormData = {
  name: string;
  message: string;
};

function GoodWishes() {
  const [open, setOpen] = useState(false);
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
      await axios.post(`${API}/laura-santos/good-wishes`, data);

      toast.success("Thank you for your good wishes!");
      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="animation-scroll relative w-screen h-screen flex bg-[#45524c] overflow-hidden
      max-lg:flex-col-reverse max-lg:h-auto"
    >
      <img
        className="animate-on-scroll  w-6/10 h-full sticky top-0 max-lg:w-full max-lg:h-[50vh] object-cover max-sm:object-[10%]"
        src="/img/9.webp"
        alt="Photo"
        width={1000}
        height={1000}
      />

      <div className=" w-4/10 h-full p-4 flex items-center max-sm:w-full max-sm:py-10">
        <div className="w-full pt-6 pb-10 text-[#8f8269] bg-[url(/img/hoja.webp)] bg-cover bg-no-repeat bg-center text-center p-4 space-y-2">
          <h2 className="animate-on-scroll font-[extraCursive] text-8xl max-lg:text-6xl">
            Good
          </h2>
          <h3 className="animate-on-scroll text-4xl -mt-4 max-sm:text-2xl">
            WISHES
          </h3>
          <p className="animate-on-scroll text-2xl max-lg:text-xl">
            We wish you the best in this new chapter, may God bless you greatly.
          </p>
          <h4 className="animate-on-scroll font-[extraCursive] text-4xl">
            Carol Rodrigez
          </h4>

          <button
            onClick={() => setOpen(true)}
            className="animate-on-scroll w-fit m-auto mt-6 flex items-center justify-center gap-2 text-2xl border border-[#45524c] px-4 py-1 hover:bg-[#45524c] hover:text-white cursor-pointer transition max-lg:text-xl"
          >
            Send Good Wishes
          </button>
        </div>
      </div>

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
            <h3 className="text-2xl mb-4 text-[#45524c] font-bold">
              Send your good wishes
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <input
                {...register("name", { required: true })}
                placeholder="Your name"
                className="border border-gray-300 p-2 rounded-lg"
                disabled={loading}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required</span>
              )}

              <textarea
                {...register("message", { required: true })}
                placeholder="Your message"
                rows={4}
                className="border border-gray-300 p-2 rounded-lg"
                disabled={loading}
              />
              {errors.message && (
                <span className="text-red-500 text-sm">
                  Message is required
                </span>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-[#45524c] text-white hover:bg-[#9a7b55] flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                  ) : null}
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(GoodWishes);
