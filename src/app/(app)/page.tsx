"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUsername } from "@/hooks/use-username";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/client";

const Lobby = () => {
  const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  const { username } = useUsername();


  const { mutate: handleCreateRoom } = useMutation({
    mutationFn: async() => {
      const response = await client.room.create.post()

      if (response.status === 200) {
        router.push(`/room/${response?.data?.roomId}`) // Navigate to the newly created room
      }
    },
  });

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* <div className="relative overflow-hidden bg-destructive/15 border border-destructive/50 p-4 text-center">
            <p className="text-destructive text-sm font-bold">ROOM DESTROYED</p>
            <p className="text-muted-foreground text-xs mt-1">
              All messages were permanently deleted.
            </p>
            <div className="warning-progress-bar" />
          </div> */}

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            {">"}private_chat
          </h1>
          <p className="text-muted-foreground text-sm">
            A private, self-destructing chat room.
          </p>
        </div>

        <div className="border border-border rounded-2xl bg-card/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-muted-foreground">
                Your Identity
              </label>

              <div className="flex items-center gap-3">
                <div className="flex-1 rounded-md bg-background border border-border px-3 py-2 text-sm text-muted-foreground font-mono">
                  {username || "--"}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-muted-foreground">
                Max Connected Users
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={20}
                  // value={maxConnected}
                  // onChange={(e) => {
                  //   const value = Number(e.target.value);
                  //   if (Number.isNaN(value)) {
                  //     setMaxConnected(1);
                  //     return;
                  //   }
                  //   setMaxConnected(Math.max(1, Math.min(20, value)));
                  // }}
                  className="flex-1 rounded-md bg-background border border-border px-3 py-2 text-sm text-foreground"
                />
              </div>
              <p className="text-muted-foreground text-xs">
                Allow between 1 and 20 users to join this room.
              </p>
            </div>

            <Button
              onClick={() => handleCreateRoom()}
              className="w-full"
              size="lg"
              // disabled={!username || isLoading}
            >
              CREATE SECURE ROOM
              {/* {isLoading ? "CREATING..." : "CREATE SECURE ROOM"} */}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

const Page = () => {
  return (
    <Suspense>
      <Lobby />
    </Suspense>
  );
};

export default Page;