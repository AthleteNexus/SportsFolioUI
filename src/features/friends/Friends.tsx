import React, { useEffect, useState } from "react";
import type { User } from "@/models/User";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/AuthContext";
import usersData from "@/mock-data/data.json";

const Friends: React.FC = () => {
	const { user } = useAuth();
	const [friends, setFriends] = useState<User[]>([]);
	const [allUsers, setAllUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [requestSent, setRequestSent] = useState<number[]>([]);

	useEffect(() => {
		if (!user) return;
		// Get all users and friends from mock data
		const users: User[] = usersData.users;
		setAllUsers(users.filter((u) => u.id !== user.id));
		setFriends(users.filter((u) => user.friends.includes(u.id)));
		setLoading(false);
	}, [user]);

	const handleSendRequest = (id: number) => {
		setRequestSent((prev) => [...prev, id]);
		// Optionally update localStorage or mock data
	};

	if (loading)
		return (
			<Card className="max-w-xl mx-auto mt-8 p-0">
				<CardHeader>
					<CardTitle>Friends</CardTitle>
				</CardHeader>
				<div className="flex flex-col items-center py-8 gap-2">
					<Spinner size={28} />
					<span>Loading friends...</span>
				</div>
			</Card>
		);

	return (
		<Card className="max-w-xl mx-auto mt-8 p-0">
			<CardHeader>
				<CardTitle>Friends</CardTitle>
			</CardHeader>
			<div className="px-6 pb-6">
				<h3 className="font-semibold mb-2">Your Friends</h3>
				{friends.length === 0 && (
					<Alert variant="default" className="mb-4">
						No friends yet.
					</Alert>
				)}
				<ul className="space-y-2 mb-6">
					{friends.map((friend) => (
						<Card key={friend.id} className="p-2">
							<span className="font-semibold">{friend.name}</span>{" "}
							<span className="text-sm text-gray-500">
								@{friend.username}
							</span>
							<Separator className="my-2" />
						</Card>
					))}
				</ul>
				<h3 className="font-semibold mb-2">Other Users</h3>
				<ul className="space-y-2">
					{allUsers.map((other) => (
						<Card
							key={other.id}
							className="p-2 flex items-center justify-between"
						>
							<div>
								<span className="font-semibold">
									{other.name}
								</span>{" "}
								<span className="text-sm text-gray-500">
									@{other.username}
								</span>
							</div>
							<Button
								size="sm"
								variant={
									requestSent.includes(other.id)
										? "outline"
										: "default"
								}
								disabled={
									requestSent.includes(other.id) ||
									friends.some((f) => f.id === other.id)
								}
								onClick={() => handleSendRequest(other.id)}
							>
								{requestSent.includes(other.id)
									? "Request Sent"
									: friends.some((f) => f.id === other.id)
									? "Friend"
									: "Add Friend"}
							</Button>
						</Card>
					))}
				</ul>
			</div>
		</Card>
	);
};

export default Friends;
