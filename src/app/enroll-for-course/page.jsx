import Layout from "@/layout/Layout";
import EnrollCoursePageClient from "@/components/courses/EnrollCoursePageClient";
import EnrollCourseModel from "@/models/EnrollCourseModel";
import { getDynamicMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
    return await getDynamicMetadata("/enroll-for-course", {
        title: "Enroll For Professional Beauty, Hair & Makeup Courses | KNK Academy Lucknow",
        description: "Enroll in professional bridal makeup masterclasses, advanced hair styling, and certified cosmetology diplomas at KNK Academy Lucknow.",
    });
}

export default async function EnrollCoursePage() {
    let courses = [];
    try {
        courses = await EnrollCourseModel.getAll({ activeOnly: true });
    } catch (error) {
        console.error("Failed to fetch courses on server:", error);
        courses = [];
    }

    return (
        <Layout>
            <EnrollCoursePageClient initialCourses={courses} />
        </Layout>
    );
}
