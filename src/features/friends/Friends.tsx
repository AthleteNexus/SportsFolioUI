import React, { useEffect, useState } from "react";
import { fetchFriends } from "@/api/friendsService";
import type { User } from "@/models/User";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";

const Friends: React.FC<{ userId?: number }> = ({ userId = 1 }) => {
	const [friends, setFriends] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchFriends(userId).then((data) => {
			setFriends(data);
			setLoading(false);
		});
	}, [userId]);

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
				{friends.length === 0 && (
					<Alert variant="default" className="mb-4">
						No friends yet.
					</Alert>
				)}
				<ul className="space-y-2">
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
			</div>
		</Card>
	);
};

export default Friends;
