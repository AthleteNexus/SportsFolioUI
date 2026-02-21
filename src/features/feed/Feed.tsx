import React, { useEffect, useState } from "react";
import { fetchPosts } from "@/api/postService";
import type { Post } from "@/models/Post";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";

const Feed: React.FC<{ userId?: number }> = ({ userId = 1 }) => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPosts(userId).then((data) => {
			setPosts(
				data.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime()
				)
			);
			setLoading(false);
		});
	}, [userId]);

	if (loading)
		return (
			<Card className="max-w-xl mx-auto mt-8 p-0">
				<CardHeader>
					<CardTitle>Newsfeed</CardTitle>
				</CardHeader>
				<div className="flex flex-col items-center py-8 gap-2">
					<Spinner size={28} />
					<span>Loading feed...</span>
				</div>
			</Card>
		);

	return (
		<Card className="max-w-xl mx-auto mt-8 p-0">
			<CardHeader>
				<CardTitle>Newsfeed</CardTitle>
			</CardHeader>
			<div className="px-6 pb-6">
				{posts.length === 0 && (
					<Alert variant="default" className="mb-4">
						No posts yet.
					</Alert>
				)}
				<div className="space-y-6">
					{posts.map((post) => (
						<Card key={post.id} className="p-4">
							<div className="mb-2 font-semibold">
								User {post.userId}
							</div>
							<div className="mb-2">{post.content}</div>
							{post.images && post.images.length > 0 && (
								<div className="mb-2">
									{post.images.map((img, i) => (
										<img
											key={i}
											src={img}
											alt="post"
											className="max-w-full mb-2 rounded"
										/>
									))}
								</div>
							)}
							<Separator className="my-2" />
							<div className="flex gap-4 text-sm">
								<span>Likes: {post.likes.length}</span>
								<span>Comments: {post.comments.length}</span>
							</div>
						</Card>
					))}
				</div>
			</div>
		</Card>
	);
};

export default Feed;
