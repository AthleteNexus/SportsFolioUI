import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";

const PostForm: React.FC = () => {
	const [content, setContent] = useState("");
	const [image, setImage] = useState("");
	const [status, setStatus] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Save post to mock backend
		setStatus("Post published (mocked)");
		setContent("");
		setImage("");
	};

	return (
		<Card className="max-w-xl mx-auto mt-8 p-0">
			<CardHeader>
				<CardTitle>Create Post</CardTitle>
			</CardHeader>
			<form className="space-y-4 px-6 pb-6" onSubmit={handleSubmit}>
				<div>
					<Label htmlFor="content">What's on your mind?</Label>
					<textarea
						id="content"
						className="w-full border rounded px-3 py-2 mt-1"
						rows={3}
						placeholder="Share your thoughts..."
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
					/>
				</div>
				<div>
					<Label htmlFor="image">Image URL (optional)</Label>
					<Input
						id="image"
						type="text"
						placeholder="Paste image URL here"
						value={image}
						onChange={(e) => setImage(e.target.value)}
						className="mt-1"
					/>
				</div>
				<Separator className="my-4" />
				<div className="flex gap-2">
					<Button type="submit">Publish</Button>
					<Button
						type="button"
						variant="outline"
						onClick={() => setStatus("Draft saved (mocked)")}
					>
						Save as Draft
					</Button>
				</div>
				{status && (
					<Alert variant="default" className="mt-2">
						{status}
					</Alert>
				)}
			</form>
		</Card>
	);
};

export default PostForm;
